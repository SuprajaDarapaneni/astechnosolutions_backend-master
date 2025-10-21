
const nodemailer = require('nodemailer');
const sendMail = async (req, res) => {
    const { name, projectIdea, company, email, phone } = req.body; // Ensure you include the code from the OAuth flow

    if (!name || !email || !projectIdea || !company || !phone) {
        return res.status(400).send('All fields are required.');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS
        }
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RAPENTECHNOLOGIES__EMAIL, // The email address where you want to receive the messages
        subject: "new Request",
        html: contactUsEmailFormate(name, email, company, projectIdea, phone)
    };

    try {
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email: ' + error.message);
            }
            res.json({ status: 'success', message: 'Email sent successfully!' });
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).send('Error sending email.');
    }
};

const contactUsEmailFormate = (name, email, company, projectIdea, phone) => {
    return `
<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                }
                h2 {
                    color: #0056b3;
                }
                p {
                    line-height: 1.6;
                }
                .highlight {
                    color: #555555;
                    font-weight: bold;
                }
                .divider {
                    border-top: 1px solid #eeeeee;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 0.8em;
                    color: #777777;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Contact Form Submission</h2>
                <p><span class="highlight">Name:</span> ${name}</p>
                <p><span class="highlight">Cource Name:</span> ${company}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Contact Number:</span> ${phone}</p>
                <div class="divider"></div>
                <p><span class="highlight">Message:</span></p>
                <p>${projectIdea}</p>
            </div>
        </body>
        </html>
        `
}
module.exports = {
    sendMail,
};
