import * as Yup from 'yup';
import { IMessage } from '../models/models';

export const validationSchema: Yup.SchemaOf<IMessage> = Yup.object().shape({
    id: Yup.string().required('id is required'),
    messageId: Yup.string().required('messageId is required'),
    layer: Yup.number().required('layer is required'),
    name: Yup.string().required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    homePage: Yup.string().url('url is invaild').optional(),
    text: Yup.string().required('text is required'),
    created: Yup.date().required('date is required'),
    loadFile: Yup.string().optional(),
    token: Yup.string().required('failed to check Captcha'),    
})

export const isValidHtml = function(text: string): boolean {    
  
    const regTags: RegExp[] = [
        /<a\b[^>]*>(.*?)<\/a>/igm, 
        /<strong\b[^>]*>(.*?)<\/strong>/igm,
        /<i\b[^>]*>(.*?)<\/i>/igm,
        /<code\b[^>]*>(.*?)<\/code>/igm,
        /<p\b[^>]*>(.*?)<\/p>/igm,
        /<br\b[^>]*>(.*?)<\/br>/igm
    ]

    const countTags = /<("[^"]*"|'[^']*'|[^'">])*>/igm

    let countValidTags = 0;
    regTags.forEach(x => { const n = text.match(x)?.length ; countValidTags += n ? n : 0 })

    return countValidTags === (text.match(countTags)?.length! / 2)
};