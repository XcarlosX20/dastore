import {
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { axiosClient } from "../../config/axios";
const PreviousSummaries = () => {
  const [open, setOpen] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const seeMore = () => {
    setOpen(!open);
    setLoading(true);
  };

  useEffect(() => {
    const getSummary = async () => {
      if (open === true) {
        const res = await axiosClient.get("api/summary/history");
        setSummaries(res.data);
        setLoading(false);
      }
    };
    getSummary();
  }, [open]);
  const format = "DD/MM/YYYY";
  return (
    <>
      <Container sx={{ paddingTop: "1rem" }}>
        <Button color="primary" onClick={seeMore}>
          {!open ? "see" : "hide"} previous monthly summaries
        </Button>
        <Collapse in={open}>
          {summaries.length > 0 ? (
            <Stack container direction="column" spacing={1}>
              {summaries.map((summary) => (
                <Card key={summary._id}>
                  <CardContent>
                    <Typography>
                      <b>Date: </b>
                      {`${moment(summary.startDate).format(format)} - ${moment(
                        summary.endDate
                      ).format(format)}`}
                    </Typography>
                    <Typography>
                      <b>Income: </b>
                      {"$" + summary.amount}
                    </Typography>
                    <Typography>
                      <b>amount of sales: </b>
                      {summary.salesAmount}
                    </Typography>
                    <Typography>
                      <b>Fee: </b>
                      <b>${summary.fee}</b>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            !loading && <Typography>Did not find anything</Typography>
          )}
          <Typography>
            {loading && (
              <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
            )}
          </Typography>
        </Collapse>
      </Container>
    </>
  );
};

export default PreviousSummaries;
