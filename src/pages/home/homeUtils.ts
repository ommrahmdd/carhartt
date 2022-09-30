import a_1 from "./../../assets/category/a_1.png";
import a_2 from "./../../assets/category/a_2.png";
import d_1 from "./../../assets/category/d_1.png";
import d_2 from "./../../assets/category/d_2.png";
import s_1 from "./../../assets/category/s_1.png";
import s_2 from "./../../assets/category/s_2.png";
import sh_1 from "./../../assets/category/sh_1.png";
import sh_2 from "./../../assets/category/sh_2.png";
import p_1 from "./../../assets/category/p_1.png";
import p_2 from "./../../assets/category/p_2.png";
import img_1 from "./../../assets/sale/8.jpg";
import img_2 from "./../../assets/sale/9.jpg";
import img_3 from "./../../assets/sale/3.jpg";
import img_4 from "./../../assets/sale/4.jpg";
import img_5 from "./../../assets/sale/5.jpg";
import img_6 from "./../../assets/sale/6.jpg";
import img_7 from "./../../assets/sale/7.jpg";
import news_1 from "./../../assets/news/1.webp";
import news_2 from "./../../assets/news/2.jpg";
export let categories = [
  {
    title: "New Arrivals",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eius autem rem dolorem, eum laudantium nihil. Id sapientemaiores porro rem optio quas illum, ipsa perspiciatisnecessitatibus cumque dicta autem saepe!",
    to: "/",
    imgs: [a_1, a_2],
  },
  {
    title: "denim",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eius autem rem dolorem, eum laudantium nihil.",
    to: "/",
    imgs: [d_1, d_2],
  },
  {
    title: "Jack & coats",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eius autem rem dolorem, eum laudantium nihil.",
    to: "/",
    imgs: [s_1, s_2],
  },
  {
    title: "shirts",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eius autem rem dolorem, eum laudantium nihil.",
    to: "/",
    imgs: [sh_1, sh_2],
  },
  {
    title: "Pants",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eius autem rem dolorem, eum laudantium nihil.",
    to: "/",
    imgs: [p_1, p_2],
  },
];

export let products = [
  {
    img: img_1,
    price: "25",
  },
  {
    img: img_2,
    price: "25",
  },
  {
    img: img_4,
    price: "25",
  },
  {
    img: img_3,
    price: "25",
  },
  {
    img: img_5,
    price: "25",
  },
  {
    img: img_6,
    price: "25",
  },
  {
    img: img_7,
    price: "25",
  },
];

export let news = [
  {
    img: news_1,
    overview:
      "It's a classic David vs. Goliath scenario with Michigan-based workwear company Carhartt, where David is the health and safety of employees and Goliath is the federal government, kind of. Recently, the Supreme Court blocked a federal mandate that would require businesses with more than 100 employees to get vaccinated or take weekly COVID-19 tests.",
    title: "Michigan Apparel Company Carhartt Is Feeling Some Heat",
    content:
      "Sometimes, it's hard to tell who cares about this country less: our own government or the corporations who basically run our government. In this instance, a business is standing up for its employees. Despite the fact that the Supreme Court said to the health and safety of the American people, Carhartt decided to uphold the vaccination mandate. Mark Valade, CEO of Carhartt, sent an email to all employees on Friday, Jan. 14 in which he stated,We put workplace safety at the very top of our priority list and the Supreme Court’s recent ruling doesnt impact that core value. He went on to say that he trusts the advice of the medical community, which has very clearly said that vaccines keep people safe. Mark also basically said the unions that represent them are in agreement. While this is great news in terms of keeping people safe, not everyone agrees with Carhartt's decision.",
  },
  {
    img: news_2,
    overview:
      "One week after apparel company Carhartt Inc. declared it was keeping its Covid-19 vaccine mandate in place, the company defended its plans despite growing pushback from customers and on social media. ",
    title:
      "Carhartt Stuck With Its Covid-19 Vaccine Mandate. The Backlash Ensued.",
    content:
      "Some people said they would stop buying Carhartt products and said the company shouldn’t be forcing its employees to choose between getting vaccinated and keeping their job. Other customers welcomed the company’s mandate and thanked Carhartt for keeping their employees safe. The workwear-apparel maker, based in Dearborn, Mich., said it decided to keep its own vaccine mandate to ensure workplace safety, a spokeswoman for the company said. Last week’s ruling from the U.S. Supreme Court striking down the Biden administration’s vaccination requirements for large private employers doesn’t affect the company’s own mandate, she said.“Carhartt fully understands and respects the varying opinions on this topic, and we are aware some of our associates do not support this policy,” the spokeswoman told The Wall Street Journal in a statement. “However, we stand behind our decision because we believe vaccines are necessary to protect our workforce.” ",
  },
];
