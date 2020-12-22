import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
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
import VCOverEighteenRequest from "../models/VCOverEighteenRequest";

interface VcFormProps {
  handleSubmit: (req: VCOverEighteenRequest) => Promise<void>;
  vcLoading: boolean;
}

enum UserEnum {
  ISSUER,
  SUBJECT,
}

export default function VcForm(props: VcFormProps) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit({
      issuerDid,
      subjectDid,
      name: `${firstName} ${lastName}`,
    });
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
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} style={{ paddingLeft: "8px" }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                Subject is over 18 yo
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                Issuer DID
              </Typography>
            </Grid>
            <Grid item className={classes.gridContainer}>
              {issuerDid && <pre style={{ fontSize: "14px" }}>{issuerDid}</pre>}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                Subject DID
              </Typography>
            </Grid>
            <Grid item className={classes.gridContainer}>
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
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                Subject Name
              </Typography>
            </Grid>
            <Grid item className={classes.gridContainer}>
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
            <Grid item className={classes.gridContainer}>
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
            <Grid item className={classes.gridContainer}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    props.vcLoading ||
                    !issuerDid ||
                    !subjectDid ||
                    !firstName ||
                    !lastName ||
                    !hasConfirmed
                  }
                >
                  Submit
                </Button>
                {props.vcLoading && (
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
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    gridContainer: {
      marginBottom: theme.spacing(2),
    },
  })
);
