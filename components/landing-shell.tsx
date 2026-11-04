import { UseCaseMenu } from "./landing-interactions";

export function LandingNav() {
  return (
    <header className="simple-nav">
      <a className="brand-mark" href="/" aria-label="Amplify home">
        <img src="/logo.png" alt="" />
        <span>{"Amplify"}</span>
      </a>
      <nav aria-label="Main navigation">
        <UseCaseMenu />
        <a href="/#images-ads">{"Images & ads"}</a>
        <a href="/#listings">{"Listings"}</a>
        <a href="/#inventory">{"Sales & inventory"}</a>
        <a href="/#pricing">{"Pricing"}</a>
      </nav>
      <a
        className="nav-cta"
        href="https://cal.com/vatsal-shah-sbzsly/amplify-demo"
      >
        {"Book a call "}
        <span aria-hidden="true">{"↗"}</span>
      </a>
    </header>
  );
}
export function LandingFooter() {
  return (
    <footer className="simple-footer">
      <a className="brand-mark" href="/" aria-label="Amplify home">
        <img src="/logo.png" alt="" />
        <span>{"Amplify"}</span>
      </a>
      <p>{"Helping brands turn great products into growing businesses."}</p>
      <div>
        <a href="/#connections">{"Channels"}</a>
        <a href="/pricing">{"Pricing"}</a>
        <a href="/privacy">{"Privacy"}</a>
        <span>
          {"© "}
          {"2026"}
          {" Amplify"}
        </span>
      </div>
    </footer>
  );
}
