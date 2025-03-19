/* eslint-disable jsx-a11y/alt-text */

export default function HerowImage() {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="
        ./images/community/Ellipse@mob.webp  1x,
        ./images/community/Ellipse@desk.webp 2x
      "
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcSet="
        ./images/community/Ellipse@mob.png  1x,
        ./images/community/Ellipse@desk.png 2x
      "
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcSet="
        ./images/community/Ellipse@tab.webp   1x,
        ./images/community/Ellipse@tab2x.webp 2x
      "
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="
        ./images/community/Ellipse@tab.png   1x,
        ./images/community/Ellipse@tab2x.png 2x
      "
        type="image/png"
      />
      <source
        media="(min-width: 1440px)"
        srcSet="
        ./images/community/Ellipse@desk.webp   1x,
        ./images/community/Ellipse@desk2x.webp 2x
      "
        type="image/webp"
      />
      <source
        media="(min-width: 1440px)"
        srcSet="
        ./images/community/Ellipse@desk.png   1x,
        ./images/community/Ellipse@desk2x.png 2x
      "
        type="image/png"
      />
      <img
        src="./images/community/Ellipse@desk.png"
        alt="women near waterfall"
        width="620"
        height="620"
        loading="lazy"
      />
    </picture>
  );
}
