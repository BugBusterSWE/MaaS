import * as nodemailer from "nodemailer";
import SentMessageInfo = nodemailer.SentMessageInfo;

/**
 * @description <p>Private transporter to send emails. Uses the direct mode
 * to send emails</p>
 * @type {Transporter}
 */
let transport : nodemailer.Transporter = nodemailer
    .createTransport("direct", {debug: true});

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
export interface MailOptions {
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
export function mailSender(mailOptions : MailOptions,
                           callback : (err : Object,
                                       response : Object) => void) : void {
    transport
        .sendMail(mailOptions, function (error : Object,
                                         response : SentMessageInfo) : void {
            if (error) {
                callback(error, undefined);
            } else {
                callback(undefined, response);
            }
        });
}
