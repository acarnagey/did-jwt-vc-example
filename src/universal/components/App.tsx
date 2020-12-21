import React, { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import api from "../api";
// import BlockchainService from "../services/BlockchainService";

// tslint:disable-next-line: variable-name
let ReactJson;
if (typeof window !== "undefined") {
  // tslint:disable-next-line: no-var-requires
  ReactJson = require("react-json-view").default;
}

enum UserEnum {
  ISSUER,
  SUBJECT,
}

export default function App() {
  const [vc, setVc] = useState(null);
  const [vcLoading, setVcLoading] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [issuerDid, setIssuerDid] = useState("");
  const [subjectDid, setSubjectDid] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const classes = useStyles();

  const loadData = async () => {
    const resp = await api.blockchain.getIssuerDID();
    setIssuerDid(resp.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVcLoading(true);
    const res: any = await api.blockchain.createVCOverEighteen({
      issuerDid,
      subjectDid,
      name: `${firstName} ${lastName}`,
    });
    setVc(res.data.verifiableCredential);
    setVcLoading(false);
  };

  const createDid = async (userType: UserEnum) => {
    const resp = await api.blockchain.createDID();
    if (userType === UserEnum.ISSUER) {
      setIssuerDid(resp.data.did);
    } else {
      setSubjectDid(resp.data.did);
    }
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
        <Container maxWidth="sm" style={{ marginTop: "24px" }}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} style={{ paddingLeft: "8px" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      Subject is over 18 yo
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "16px" }}>
                    <Typography variant="subtitle1" className={classes.title}>
                      Issuer DID
                    </Typography>
                  </Grid>
                  <Grid item>
                    {issuerDid && (
                      <pre style={{ fontSize: "14px" }}>{issuerDid}</pre>
                    )}
                  </Grid>
                  <Grid item style={{ marginTop: "16px" }}>
                    <Typography variant="subtitle1" className={classes.title}>
                      Subject DID
                    </Typography>
                  </Grid>
                  <Grid item>
                    {!subjectDid && (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        onClick={() => createDid(UserEnum.SUBJECT)}
                      >
                        Create DID
                      </Button>
                    )}
                    {subjectDid && (
                      <pre style={{ fontSize: "14px" }}>{subjectDid}</pre>
                    )}
                  </Grid>
                  <Grid item style={{ marginTop: "16px" }}>
                    <Typography variant="subtitle1" className={classes.title}>
                      Subject Name
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="fname"
                      name="fname"
                      label="First Name"
                      style={{ margin: 8 }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                      id="lname"
                      name="lname"
                      label="Last Name"
                      style={{ margin: 8 }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hasConfirmed}
                          onChange={() => setHasConfirmed(!hasConfirmed)}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="I, the issuer, confirm that the subject is over 18 years of age."
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "16px" }}>
                    <div className={classes.wrapper}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                          vcLoading ||
                          !issuerDid ||
                          !subjectDid ||
                          !firstName ||
                          !lastName ||
                          !hasConfirmed
                        }
                      >
                        Submit
                      </Button>
                      {vcLoading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          {vc && (
            <Card style={{ marginTop: "16px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ marginBottom: "16px" }}
                >
                  VC Successfully created!
                </Typography>
                {ReactJson && (
                  <ReactJson
                    src={vc}
                    theme="rjv-default"
                    indentWidth={2}
                    collapseStringsAfterLength={28}
                    displayObjectSize={false}
                    displayDataTypes={false}
                  />
                )}
                {/* <span>{JSON.stringify(vc)}</span> */}
              </CardContent>
            </Card>
          )}
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    wrapper: {
      // margin: theme.spacing(1),
      position: "relative",
      width: "min-content",
    },
    buttonProgress: {
      // color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);
