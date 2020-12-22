import React, { useState } from "react";
import { CssBaseline, AppBar, Toolbar, Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import api from "../api";
import VcForm from "./VcForm";
import VCOverEighteenRequest from "../models/VCOverEighteenRequest";
import VcResult from "./VcResult";

export default function App() {
  const [vc, setVc] = useState(null);
  const [vcLoading, setVcLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (req: VCOverEighteenRequest) => {
    setVcLoading(true);
    const res: any = await api.blockchain.createVCOverEighteen(req);
    setVc(res.data.verifiableCredential);
    setVcLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              DID VC Example
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" className={classes.container}>
          <VcForm handleSubmit={handleSubmit} vcLoading={vcLoading} />
          <VcResult vc={vc} />
        </Container>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(3),
    },
  })
);
