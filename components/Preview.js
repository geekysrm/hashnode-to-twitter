import styles from "../styles/Preview.module.css";
import {
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FiChevronDown } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";

const Preview = () => {
  const date = Date;
  return (
    <div className={styles.rootContainer}>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Here's how your tweets will look
      </h1>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <div className={styles.page}>
          {/* <div className={`${styles.topbar}`}>
            <i className={`${styles.materialIcons}`}></i>
            <b>Tweet</b>
          </div> */}
          <div className={`${styles.tweet}`}>
            <div
              className={`${styles.tweetContainer} ${styles.pb} ${styles.pr} ${styles.pl}`}
            >
              <div className={`${styles.user} ${styles.pr}`}>
                <img src="https://github.com/geekysrm.png" />
                <div className={`${styles.username}`}>
                  <div className={styles.name}>Soumya</div>
                  <div className={styles.handle}>@geekysrm</div>
                </div>
                <i className={`${styles.materialIcons}`}>
                  <FiChevronDown />
                </i>
              </div>
              <div className={`${styles.tweetContent} ${styles.pt}`}>
                Bonjour! <br />
                I've created this HTML template based on Twitter's UI.
                <br />
                Follow me on github{" "}
                <a href="http://github.com/geekysrm" target="_blank">
                  github.com/geekysrm
                </a>
              </div>
              <img
                className={styles.media}
                src="https://i.giphy.com/media/26ufp2LYURTvL5PRS/giphy.webp"
              />
              <div className={`${styles.date} ${styles.pt} ${styles.pb}`}>
                4:20 pm • 1 Oct 17 from <a>Manchester, UK</a>
              </div>
              <div className={`${styles.rl} ${styles.pt} ${styles.pb}`}>
                <div className={styles.retweets}>
                  <b>15.4K</b> Retweets
                </div>
                <div className={styles.likes}>
                  <b>20.9K</b> Likes
                </div>
              </div>
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
          <div className={`${styles.wrap} ${styles.pt}`}>
            <div className={styles.box}>
              <div className={styles.line}>
                <div className={styles.border} />
                <img
                  className={styles.avatar}
                  src="https://github.com/geekysrm.png"
                />{" "}
              </div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={`${styles.userinfo} ${styles.sl}`}>
                    <div className={styles.name}>Soumya</div>
                    <div className={styles.handle}>@geekysrm</div>
                    <div className={styles.time}>10m</div>
                  </div>
                  <i className={styles.materialIcons}>
                    {" "}
                    <FiChevronDown style={{ color: "white" }} />
                  </i>
                </div>
                <div className={`${styles.replyto} ${styles.sl}`}>
                  Replying to <a>@geekysrm</a>
                </div>
                <div className={`${styles.subtweetContent} ${styles.sl}`}>
                  You can follow me on twitter too ٩(◕‿◕｡)۶{" "}
                  <a href="http://twitter.com/geekysrm" target="_blank">
                    twitter.com/geekysrm
                  </a>
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
      </div>
    </div>
  );
};

export default Preview;
