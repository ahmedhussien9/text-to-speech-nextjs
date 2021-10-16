import Head from "next/head";
import Header from "../components/Header";

const Layout = (props) => (
  <div className="site-wrapper">
    <Head>
      <title>
        {props.title ? `${props.title} ` : ""}
      </title>
      {props.description ? (
        <meta name="description" content={props.description} />
      ) : null}
    </Head>

    {/* <Header /> */}

    <div className="layout">{props.children}</div>
    <footer>
      Made with love{" "}
      <a
        href="http://www.ahmedhussien.me/"
        className="footerLink"
        target="_blank"
      >
        Ahmed Khattab
      </a>{" "}
    </footer>

    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap");
      * {
        font-family: "Open Sans", sans-serif;
        margin: 0;
        padding: 0;
        text-decoration: none;
      }

      html,
      body {
        min-height: 100%;
        background: #082032;
      }

      p {
        margin: 16px auto;
        line-height: 1.5em;
      }

      .layout {
        margin: 0 auto;
        max-width: 850px;
      }

      nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 40px auto;
        align-items: center;
        border: 1px solid #000;
        padding: 1rem 1rem;
      }

      nav .links {
        display: inline-block;
        text-align: right;
      }

      nav a {
        display: inline-block;
        margin-left: 20px;
        font-weight: 400;
        padding-bottom: 8px;
        border-bottom: 3px solid transparent;
      }

      footer {
        border-top: 1px solid #fff;
        padding: 1.5rem 0rem;
        text-align: center;
        color: #fff;
      }

      .footerLink {
        color: rgb(201, 150, 204);
      }
    `}</style>
  </div>
);

export default Layout;
