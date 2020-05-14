import Image from '../components/elements/Image';
import React from 'react';

class Download extends React.Component {
  render() {
    return (
      <div style={{textAlign:'center', marginTop: 100}}>
        <div style={{marginBottom: 50}}>
          <Image
            style={{marginLeft: 'auto', marginRight: 'auto'}}
            width={200}
            height={200}
            src={require('./../assets/images/qrcode.png')}
            alt="QR Code"
          />
          安卓下载
        </div>
        <div>
          <Image
            style={{marginLeft: 'auto', marginRight: 'auto'}}
            width={200}
            height={200}
            src={require('./../assets/images/wevid_ios_qrcode.png')}
            alt="QR Code"
          />
          iOS下载
        </div>
      </div>
    );
  }
}

export default Download;