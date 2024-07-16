export const emailConfirmationParticipant = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
       body {
        font-family: Helvetica, Arial, sans-serif;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
      }
      .email-container {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        text-align: center;
      }
        .email-body {
            font-size: 16px;
            margin-bottom: 20px;
            width: 100%;
            text-align: left; 
        }
        .email-footer {
            font-size: 14px;
            color: #888888;
            text-align: center;
        }
        .email-footer a {
            color: #6420d3;
            text-decoration: none;
        }
        .email-footer a:hover {
            color: #4f0cbb;
        }
        .email-body h2 {
            font-size: 16px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        .email-body a {
            color: #6420d3;
            text-decoration: none;
        }
        .email-body a:hover {
            color: #4f0cbb;
        }
        .buttons {
            text-align: center;
            margin-top: 30px;
        }
        .email-body button {
            padding: 20px 40px;
            border: none;
            font-size: 14px;
            color: white;
            cursor: pointer;
            background-color: #6420d3;
            text-decoration: none;
            display: inline-block;
        }
        .email-body button:hover {
            background-color: #4f0cbb;
        }
        .note {
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-body">
            <p>Hi {{name}},</p>
            <p>Your 30 Minute Meeting with {{hostName}} at {{time}} ({{timezone}}) on {{date}} is scheduled.</p>
            <p>Your Answer:</p>
            <h2>Please share anything that will help prepare for our meeting.</h2>
            <p>{{message}}</p>
            <p class="note">This event should automatically show up on your calendar. If needed, you can still add it manually.</p>
            <div class="buttons">
            
                <button style="background-color: #6420d3;"><a href="{{buttonLink}}" style="color: white; text-decoration: none;">Add to Calendar</a></button>
                
            </div>
        </div>
        <div class="email-footer">
            Calendly will automatically add scheduled events if you <a href="#" style="color: #6420d3; text-decoration: none;">connect your calendar</a>.
        </div>
    </div>
</body>
</html>

`;
