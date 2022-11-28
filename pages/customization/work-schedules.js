import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInfoCompanyAction,
  setInfoCompanyAction
} from '../../Actions/ActionsCompany'
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Alert
} from '@mui/material'
import Side from '../../Components/Layout/Side'
import Loading from '../../Components/Utils/Loading'
// import moment from "moment";
const WorkSchedules = () => {
  // const hrformat = "HH:mm";
  const dispatch = useDispatch()
  const setInfoCompany = (property, data) =>
    dispatch(setInfoCompanyAction({ property, data }))
  const {
    workdays,
    workTime: { startTime, endTime }
  } = useSelector((state) => state.company)
  const [newWorkSchedule, setNewWorkSchedule] = useState({
    daysSelected: [],
    workTime: { startTime: '', endTime: '' }
  })
  useEffect(() => {
    const loadInfoCompany = async () => await dispatch(getInfoCompanyAction())
    loadInfoCompany()
  }, [dispatch])
  useEffect(() => {
    if (workdays.length && startTime && endTime) {
      setNewWorkSchedule({
        daysSelected: workdays,
        workTime: {
          startTime,
          endTime
        }
      })
    }
  }, [workdays, startTime, endTime])

  const handleWorkschedules = ({ e, weekday }) => {
    const alreadySelected = newWorkSchedule.daysSelected.includes(weekday)
    if (alreadySelected) {
      const filtered = newWorkSchedule.daysSelected.filter(
        (item) => item !== weekday
      )
      setNewWorkSchedule({ ...newWorkSchedule, daysSelected: filtered })
    } else {
      setNewWorkSchedule({
        ...newWorkSchedule,
        daysSelected: [...newWorkSchedule.daysSelected, weekday]
      })
    }

    if (e.target.type === 'time') {
      const { name, value } = e.target
      setNewWorkSchedule({
        ...newWorkSchedule,
        workTime: { ...newWorkSchedule.workTime, [name]: value }
      })
    }
  }
  const checkIfChange = () => {
    const { daysSelected, workTime } = newWorkSchedule
    const arr1 = daysSelected.sort()
    const arr2 = workdays.sort()
    let different = false
    arr1.forEach((item, index) => {
      if (arr2[index] !== item) {
        different = true
      }
    })
    if (
      arr1.length !== arr2.length ||
      workTime.startTime !== startTime ||
      workTime.endTime !== endTime
    ) {
      different = true
    }
    return !different
  }
  const submitWorkSchedules = () => {
    const data = {
      workdays: newWorkSchedule.daysSelected,
      workTime: newWorkSchedule.workTime
    }
    setInfoCompany(['workdays', 'workTime'], data)
  }
  const { daysSelected, workTime } = newWorkSchedule
  return (
    <Side>
      <h3>Work Schedules</h3>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ].map((weekday) => {
          const labelId = `checkbox-list-label-${weekday}`
          return (
            <ListItem key={weekday} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={(e) => handleWorkschedules({ e, weekday })}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={
                      daysSelected.length && daysSelected.includes(weekday)
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={weekday} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Grid container direction='row' gap={2}>
        <TextField
          id='time'
          label='opening time'
          type='time'
          value={workTime.startTime}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
          sx={{ width: 150 }}
          name='startTime'
          onChange={(e) => handleWorkschedules({ e })}
        />
        <TextField
          id='time'
          label='departure time'
          type='time'
          name='endTime'
          value={workTime.endTime}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => handleWorkschedules({ e })}
        />
        <Button
          variant='contained'
          onClick={submitWorkSchedules}
          disabled={checkIfChange()}
        >
          Save changes
        </Button>
      </Grid>
    </Side>
  )
}

export default WorkSchedules
