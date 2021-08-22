import styles from "../styles/Preview.module.css";
import {
  RetweetOutlined,
  HeartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FiChevronDown } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";

const SubTweet = ({ tweet }) => {
  return (
    <div>
      <div className={`${styles.wrap} ${styles.pt}`}>
        <div className={styles.box}>
          <div className={styles.line}>
            <div className={styles.border} />
            <img
              className={styles.avatar}
              src="https://github.com/geekysrm.png"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={`${styles.userinfo} ${styles.sl}`}>
                <div className={styles.name}>Soumya</div>
                <div className={styles.handle}>@geekysrm</div>
                <div className={`${styles.time}`}>
                  <span> • </span>
                  <span className={styles.dateTime}>2m</span>
                </div>
              </div>
              <i className={styles.materialIcons}>
                <FiChevronDown />
              </i>
            </div>
            <div className={`${styles.replyto} ${styles.sl}`}>
              Replying to <a>@geekysrm</a>
            </div>
            <div className={`${styles.subtweetContent} ${styles.sl}`}>
              {tweet}
            </div>
            <div className={styles.icons}>
              <div className={styles.ico}>
                <BiMessageRounded />
              </div>
              <div className={styles.ico}>
                <RetweetOutlined />
              </div>
              <div className={styles.ico}>
                <HeartOutlined />
              </div>
              <div className={styles.ico}>
                <MailOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubTweet;
