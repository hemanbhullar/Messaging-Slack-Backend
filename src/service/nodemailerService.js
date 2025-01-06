import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D", 
    },
});

export const mailsenderService = async (user) => {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: user.email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

mailsenderService().catch(console.error);
