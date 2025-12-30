import DeviceInfo from 'react-native-device-info';

export class ExamSecurityService {
  static async getDeviceFingerprint(): Promise<string> {
    const uniqueId = await DeviceInfo.getUniqueId();
    const model = await DeviceInfo.getModel();
    const osVersion = await DeviceInfo.getSystemVersion();
    
    const fingerprint = `${uniqueId}:${model}:${osVersion}`;
    return fingerprint;
  }
}
