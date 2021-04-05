import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {

    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount', testAccount)

    let transporter = nodemailer.createTransport({
        host: "",
        port:  555,
        secure: false,
        auth: {
            user: 'k4qebauxrh2rzuyx@ethereal.email',
            pass: 'bHAm6kjYu7HSb3Gdxg',
        },
    });




    let info = await transporter.sendMail({
        from: "ph",
        to: to,
        subject: "Change Password",
        html, 
        
    });

    console.log("Message sent: ", info.messageId);

    console.log("preview URL:", nodemailer.getTestMessageUrl(info));
}