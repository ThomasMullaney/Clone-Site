import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount', testAccount)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:  555,
        secure: false,
        auth: {
            user: 'k4qebauxrh2rzuyx@ethereal.email',
            pass: 'bHAm6kjYu7HSb3Gdxg',
        },
    });

    //send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Yo Mama " <foo@example.com>', //sender address
        to: to, // list of receivers
        subject: "Change Password", // Subject line
        html, 
    });

    console.log("Message sent: ", info.messageId);
    console.log("preview URL:", nodemailer.getTestMessageUrl(info));
}