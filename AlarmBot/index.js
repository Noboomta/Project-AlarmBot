const express = require("express");
const request = require("request-promise");

const app = express();
app.use(express.json());
app.get("/plus_2_num", (req, res) =>{
    console.log(req.query);
    console.log(req.query.a);
    var output = req.query.a+req.query.b;
    var format = /[0-9]*/;
    res.send("Success "+output);
});
app.post("/webhook", (req, res) => {
  
    const input_text = req.body.events[0].message.text;
    var format = /[0-9]*/;
    var time = 1;
    console.log(input_text+" from user "+ req.body.events[0].source.userId);
    var out_text = input_text + " seconds passed";
    console.log(format.test(input_text));
    console.log(input_text.match(format));
    if(input_text == "greet"){
        out_text = "สวัสดีครับ นี่คือบอทสำหรับตั้งเวลาครับผม(ยังใช้ได้ไม่เกิน 29 วินาทีนะครับ)";
    }
    else if(input_text == "เทพบูม"){
        out_text = "ถูก บูมมันของจริง";
    }
    else if(!Number.isInteger(parseInt(input_text))){
        console.log("not int");
        return res.send("success");
    }
    else if(parseInt(input_text)>=30 && parseInt(input_text)<1){
      out_text = "เวลาเกินนะเอาใหม่ๆ";
    }
    else{
        time = parseInt(input_text)*1000;
    }

    setTimeout(() => {
       request({
        method: "POST",
        uri: "https://api.line.me/v2/bot/message/reply",
        headers: {
          Authorization:
            "Bearer k3XTd807lJjKmD27rD5wNJ/aB58zAqMA72nCnROplQIFn470/n8ko/BfFqXpwTHvs+f6ONdMW4TG7AuaxQhaFRb9y7Tq9IJkVTk/uMUUaR62lnZg2FwZe4p8ILKBQRfBWMzwMJI8T4ZnOMOOVa5ZBgdB04t89/1O/w1cDnyilFU=",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: [
            {
              type: "text",
              text: out_text,
            },
          ],
        }),
      })
        .then(() => {
          res.send("Success");
        })
        .catch((e) => {
          console.log(e);
        });
    }, time);
});

app.listen(5000);