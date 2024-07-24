import { v4 as uuidv4 } from 'uuid';
const getDeviceDetail=async (req, res, next) =>{
    req.session.device_id = uuidv4();
    req.session.device_name = req.headers['user-agent'] || 'Unknown Device';
    next();
}

export {getDeviceDetail}