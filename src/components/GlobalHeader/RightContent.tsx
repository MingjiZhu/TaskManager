import { Tooltip, Modal, Button } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
} & Partial<ConnectProps> &
  Partial<ProSettings>;

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;
  const [showContact, setShowContact] = React.useState(false);

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleOnClick = () => {
    setShowContact(true)
  }

  const handleClose = () => {
    setShowContact(false)
  }

  const Mailto = (email:string, subject:string, body:string, children:string ) => {
    return (
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
    );
  };

  return (
    <div className={className}>

      <Tooltip title="">
        <a
          target="_blank"
          onClick={handleOnClick}
          rel="noopener noreferrer"
          className={styles.action}
        >
          Contact
        </a>
        <Modal
          title='Mingji Zhu'
          width="400px"
          visible={showContact}
          onCancel={handleClose}
          footer={[
            Mailto("mzhu9815@conestogac.on.ca","","","Send an Email")
          ]}
        >
          <p>Phone: (+1) 226-989-0151</p>
          <p>Email: mzhu9815@conestogac.on.ca</p>
          
        </Modal>
      </Tooltip>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
