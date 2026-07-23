import nodemailer from 'nodemailer';
import validator from 'validator';

const config = useRuntimeConfig();
const mailPort = Number(config.MAILPORT);
// true = implicit TLS (port 465, e.g. DreamHost); false = STARTTLS (port 587, e.g. Ethereal)
const mailSecure = config.MAILSECURE === true || config.MAILSECURE === 'true';

const transporter = nodemailer.createTransport({
    host: config.MAILHOST,
    port: mailPort,
    secure: mailSecure,
    requireTLS: !mailSecure,
    auth: {
        user: config.MAILUSER,
        pass: config.MAILPASSWORD
    }
});

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const data = await isValid(body);

        await transporter.verify();

        await transporter.sendMail({
            from: `"${data.name}" <${data.email}>`,
            to: config.CONTACTMAIL,
            subject: data.subject,
            text: data.message,
            html: data.message
        });

        return 'success';
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation failed',
            data: error
        });
    }
});

async function isValid(body) {
    const errors = [];
    if (validator.isEmpty(body.email || ''))
    errors.push({
        field: 'email',
        error: 'Field is required.'
    })
    if (validator.isEmpty(body.name || ''))
    errors.push({
        field: 'name',
        error: 'Field is required.'
    })
    if (validator.isEmpty(body.subject || ''))
    errors.push({
        field: 'subject',
        error: 'Field is required.'
    })
    if (validator.isEmpty(body.message || ''))
    errors.push({
        field: 'message',
        error: 'Field is required.'
    })
    if (!validator.isEmail(body.email || ''))
    errors.push({
        field: 'email',
        error: 'Field should be a valid email.'
    })
    if (errors.length > 0) {
        return Promise.reject(errors);
    } else {
        return Promise.resolve({
            email: validator.normalizeEmail(body.email),
            subject: validator.escape(body.subject),   
            name: validator.escape(body.name),   
            message: validator.escape(body.message)   
        })
    }
}