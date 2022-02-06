import React from "react";
import "./SignUpDialogues.css";
import { Button } from "@mui/material";

interface Props {}

const Terms: React.FC<Props> = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <p>
          Esse minim voluptate id aute id aliquip sit dolore elit amet. Dolore
          ex aliqua do laborum tempor sunt reprehenderit do in deserunt. Ullamco
          laborum cillum sint nostrud minim dolor non excepteur ipsum.
          Exercitation deserunt non exercitation ad ad reprehenderit aute.
          Pariatur aute anim sunt incididunt labore nisi qui nulla.
        </p>
        <p>
          Quis anim dolore veniam non non ipsum nostrud exercitation ea mollit
          incididunt commodo. Proident sunt sunt consequat ipsum do sint
          ullamco. Mollit anim elit nisi nulla consectetur in officia culpa
          sint. Irure dolor nisi sint pariatur ut excepteur commodo eu ut.
          Labore labore ullamco ullamco esse aute Lorem nisi exercitation.
        </p>
        <p>
          Incididunt commodo nisi incididunt deserunt culpa do dolor culpa
          dolore aute occaecat cillum minim consequat. Aliqua sunt dolore ipsum
          cupidatat nostrud cupidatat et veniam sit nostrud ullamco minim ad.
          Cillum quis excepteur do magna mollit excepteur sunt.
        </p>
        <p>
          Ex adipisicing commodo nostrud ex commodo laboris sit nostrud culpa
          anim ut. Ad magna Lorem ut eu laboris. Ex eiusmod in amet pariatur.
        </p>
        <p>
          Culpa anim magna id ut Lorem. Duis adipisicing labore commodo minim ex
          magna commodo. Veniam ad voluptate dolor ipsum veniam proident eu
          excepteur aliquip sit commodo elit. Fugiat enim qui velit laboris nisi
          cillum proident officia. Qui nisi nostrud culpa laboris eiusmod sint
          incididunt tempor officia. Irure duis aute cillum excepteur est eu
          quis adipisicing nulla. Ipsum cupidatat magna sunt reprehenderit et
          sit duis et commodo pariatur exercitation nisi adipisicing laboris.
        </p>
        <p>
          Culpa eiusmod do duis tempor magna duis voluptate sit do nostrud est
          consequat. Deserunt occaecat exercitation sunt excepteur officia anim
          sint ea eu excepteur esse reprehenderit. Deserunt anim occaecat
          eiusmod dolor.
        </p>
        <Button className="main-button" href="/" variant="contained">
          Sunt de acord
        </Button>
      </div>
    </div>
  );
};

export default Terms;
