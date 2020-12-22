import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// tslint:disable-next-line: variable-name
let ReactJson;
if (typeof window !== "undefined") {
  // tslint:disable-next-line: no-var-requires
  ReactJson = require("react-json-view").default;
}

interface VcResultProps {
  vc: any;
}

export default function VcResult(props: VcResultProps) {
  const classes = useStyles();

  return (
    <>
      {props.vc && (
        <Card className={classes.cardContainer}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              VC Successfully created!
            </Typography>
            {ReactJson && (
              <ReactJson
                src={props.vc}
                theme="rjv-default"
                indentWidth={2}
                collapseStringsAfterLength={28}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    cardContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);
