const Footer = () => {
  return (
    <footer className="bg-[ aliceblue] h-[200px] w-full flex justify-between p-[2rem] ">
      <div>
        <h1 className="uppercase ">HelloVite</h1>

        <p>@All right reserver</p>
      </div>
      <div className="follow-box">
        <h5>Follow me on </h5>
        <a
          href="https://www.linkedin.com/in/nishachauhan0318/"
          target={"_blank"}
        >
          Linkdin
        </a>
        <a
          href="https://www.instagram.com/nisha_chauhan1801/"
          target={"_blank"}
        >
          Instagram
        </a>
        <a href="https://github.com/nisha-chauhan" target={"_blank"}>
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
