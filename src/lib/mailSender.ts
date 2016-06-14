import * as nodemailer from "nodemailer";

/**
 * Interface with configurations for sending an email
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * |   Luca Bianco   | Create class     | 09/06/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 *
 */
interface MailOptions {
    /**
     * @description Mail sender
     */
        from : string;

    /**
     * @description Mail recivers
     */
    to : string;

    /**
     * @subject ofEmail
     */
    subject : string;

    /**
     * @description body of email il plain text type
     */
    text : string;

    /**
     * @description body of email in html type
     */
    html : string;
}

/**
 * Function to send Mail with smtp transporter
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * |   Luca Bianco   | Create function  | 09/06/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 *
 */
export function sendMailer(message : string,
                           smtp : string,
                           mailOptions : MailOptions,
                           callback : (err : Object,
                                       response : Object) => void) : void {

    let transport : nodemailer.Transporter = nodemailer
        .createTransport("SMTP", smtp);

    mailOptions.text = message;

    transport.sendMail(mailOptions, function (error : Object,
                                              response : Object) : void {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, response);
        }
    });
}
