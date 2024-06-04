import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import SpeedIcon from "@material-ui/icons/Speed";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import TodayIcon from '@material-ui/icons/Today';
import BlockIcon from '@material-ui/icons/Block';
import DoneIcon from '@material-ui/icons/Done';

import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

import Chart from "./Chart";
import ButtonWithSpinner from "../../components/ButtonWithSpinner";

import CardCounter from "../../components/Dashboard/CardCounter";
import TableAttendantsStatus from "../../components/Dashboard/TableAttendantsStatus";
import { isArray } from "lodash";

import useDashboard from "../../hooks/useDashboard";
import useCompanies from "../../hooks/useCompanies";

import { isEmpty } from "lodash";
import moment from "moment";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: 240,
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  cardAvatar: {
    fontSize: "55px",
    color: grey[500],
    backgroundColor: "#ffffff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardTitle: {
    fontSize: "18px",
    color: blue[700],
  },
  cardSubtitle: {
    color: grey[600],
    fontSize: "14px",
  },
  alignRight: {
    textAlign: "right",
  },
  fullWidth: {
    width: "100%",
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [counters, setCounters] = useState({});
  const [attendants, setAttendants] = useState([]);
  const [filterType, setFilterType] = useState(1);
  const [period, setPeriod] = useState(0);
  const [companyDueDate, setCompanyDueDate] = useState();
  const [dateFrom, setDateFrom] = useState(
    moment("1", "D").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const { find } = useDashboard();
  const { finding } = useCompanies();
  useEffect(() => {
    async function firstLoad() {
      await fetchData();
    }
    setTimeout(() => {
      firstLoad();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleChangePeriod(value) {
    setPeriod(value);
  }

  async function handleChangeFilterType(value) {
    setFilterType(value);
    if (value === 1) {
      setPeriod(0);
    } else {
      setDateFrom("");
      setDateTo("");
    }
  }

  async function fetchData() {
    setLoading(true);

    let params = {};

    if (period > 0) {
      params = {
        days: period,
      };
    }

    if (!isEmpty(dateFrom) && moment(dateFrom).isValid()) {
      params = {
        ...params,
        date_from: moment(dateFrom).format("YYYY-MM-DD"),
      };
    }

    if (!isEmpty(dateTo) && moment(dateTo).isValid()) {
      params = {
        ...params,
        date_to: moment(dateTo).format("YYYY-MM-DD"),
      };
    }

    if (Object.keys(params).length === 0) {
      toast.error("Parametrize o filtro");
      setLoading(false);
      return;
    }

    const data = await find(params);
    setCounters(data.counters);
    if (isArray(data.attendants)) {
      setAttendants(data.attendants);
    } else {
      setAttendants([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await loadCompanies();
    }
    fetchData();
  }, [])
  //let companyDueDate = localStorage.getItem("companyDueDate");
  //const companyDueDate = localStorage.getItem("companyDueDate").toString();
  const companyId = localStorage.getItem("companyId");
  const loadCompanies = async () => {
    setLoading(true);
    try {
      const companiesList = await finding(companyId);
      setCompanyDueDate(moment(companiesList.dueDate).format("DD/MM/yyyy"));
    } catch (e) {
      console.log("🚀 Console Log : e", e);
      // toast.error("Não foi possível carregar a lista de registros");
    }
    setLoading(false);
  };

  function formatTime(minutes) {
    return moment()
      .startOf("day")
      .add(minutes, "minutes")
      .format("HH[h] mm[m]");
  }

  function renderFilters() {
    if (filterType === 1) {
      return (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label={i18n.t("dashboard.charts.filters.startDate")}
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label={i18n.t("dashboard.charts.filters.endDate")}
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="period-selector-label">{i18n.t("dashboard.charts.filters.period")}</InputLabel>
            <Select
              labelId="period-selector-label"
              id="period-selector"
              value={period}
              onChange={(e) => handleChangePeriod(e.target.value)}
            >
              <MenuItem value={0}>{i18n.t("dashboard.charts.filters.period.zero")}</MenuItem>
              <MenuItem value={3}>{i18n.t("dashboard.charts.filters.period.three")}</MenuItem>
              <MenuItem value={7}>{i18n.t("dashboard.charts.filters.period.seven")}</MenuItem>
              <MenuItem value={15}>{i18n.t("dashboard.charts.filters.period.fifteen")}</MenuItem>
              <MenuItem value={30}>{i18n.t("dashboard.charts.filters.period.thirty")}</MenuItem>
              <MenuItem value={60}>{i18n.t("dashboard.charts.filters.period.sixty")}</MenuItem>
              <MenuItem value={90}>{i18n.t("dashboard.charts.filters.period.ninety")}</MenuItem>
            </Select>
            <FormHelperText>{i18n.t("dashboard.charts.filters.period.input")}</FormHelperText>
          </FormControl>
        </Grid>
      );
    }
  }

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <CardCounter
              icon={<TodayIcon fontSize="inherit" />}
              title={i18n.t("dashboard.charts.filters.duedate")}
              value={companyDueDate}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.selectContainer}>
              <InputLabel id="period-selector-label">{i18n.t("dashboard.charts.filters.filtertype.title")}</InputLabel>
              <Select
                labelId="period-selector-label"
                value={filterType}
                onChange={(e) => handleChangeFilterType(e.target.value)}
              >
                <MenuItem value={1}>{i18n.t("dashboard.charts.filters.filtertype.valueA")}</MenuItem>
                <MenuItem value={2}>{i18n.t("dashboard.charts.filters.filtertype.titleB")}</MenuItem>
              </Select>
              <FormHelperText>{i18n.t("dashboard.charts.filters.filtertype.helperText")}</FormHelperText>
            </FormControl>
          </Grid>

          {renderFilters()}      

          <Grid item xs={12} className={classes.alignRight}>
            <ButtonWithSpinner
              loading={loading}
              onClick={() => fetchData()}
              variant="contained"
              color="primary"
            >
              Filtrar
            </ButtonWithSpinner>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<GroupIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.attdPendants")}
              value={counters.supportPending}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<GroupIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.attdHappening")}
              value={counters.supportHappening}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<AssignmentIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.attdPerformed")}
              value={counters.supportFinished}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<PersonIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.leads")}
              value={counters.leads}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<SpeedIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.mtofService")}
              value={formatTime(counters.avgSupportTime)}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardCounter
              icon={<SpeedIcon fontSize="inherit" />}
              title={i18n.t("dashboard.cards.mtofwaiting")}
              value={formatTime(counters.avgWaitTime)}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12}>
            {attendants.length ? (
              <TableAttendantsStatus
                attendants={attendants}
                loading={loading}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
