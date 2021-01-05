import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "./InfoBox.css";
import Spinner from '../../spinner/Spinner';
import Error from '../error/Error';

function InfoBox({ title, cases, total, active, isRed, loading, error, bgImage,  ...props }) {

  return (
    <Card
      onClick={props.onClick}
      className={`infoBox`}
      style = {{backgroundImage:`url(${bgImage})`}}
    >
    {loading && <Spinner />}
    {!loading &&
    <>
        <CardContent>  
          {error && <Error error = {error}/>}
          {!error &&
          <>
            <p className="titleInfoBox">
              {title}
            </p>
            <h2 className={`infoBoxCases ${isRed?'':'infoBoxCasesGreen'}`}>
              {cases}
            </h2>
          </>
          }
        </CardContent>
    </>
    }
    </Card>
  );
}

export default InfoBox;