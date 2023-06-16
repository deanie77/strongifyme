import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Select,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { LOCAL_STORAGE_HEIGHT, LOCAL_STORAGE_WEIGHT } from '../config/constants'
import { userBMI } from '../features/user/userSlice'
import {
  TEXT_BMI,
  TEXT_BMI_CALCULATOR_FORM_CLEAR,
  TEXT_BMI_CALCULATOR_FORM_SELECT_PLACEHOLDER_HEIGHT,
  TEXT_BMI_CALCULATOR_FORM_SELECT_PLACEHOLDER_WEIGHT,
  TEXT_BMI_CALCULATOR_FORM_SUBMIT,
  TEXT_BMI_CALCULATOR_HEALTHY,
  TEXT_BMI_CALCULATOR_HEALTH_RANGE,
  TEXT_BMI_CALCULATOR_HEIGHT,
  TEXT_BMI_CALCULATOR_METRIC_SYSTEM,
  TEXT_BMI_CALCULATOR_OBESE,
  TEXT_BMI_CALCULATOR_OVERWEIGHT,
  TEXT_BMI_CALCULATOR_RESULT,
  TEXT_BMI_CALCULATOR_RESULT_ENTER_DATA,
  TEXT_BMI_CALCULATOR_UNDERWEIGHT,
  TEXT_BMI_CALCULATOR_WEIGHT,
  TEXT_BMI_REPORT,
  TEXT_SHARED_ERROR,
  TEXT_SHARED_UNITS_CM,
  TEXT_SHARED_UNITS_KG,
} from '../localization/texts'

/**
 * Calculate BMI
 *
 * Metric system
 * Kilograms and centimeters
 *
 * Formula:
 * weight (kg) / [height (m)]2
 *
 * The formula for BMI is weight in kilograms divided by height in meters squared.
 * If height has been measured in centimeters, divide by 100 to convert this to meters.
 *
 * @param {number} weight - weight in kilograms
 * @param {number} height - height in centimeters
 *
 * @returns {number} - BMI
 *
 */
const calculatePersonBMI = (weight: number, height: number): number => {
  const heightInCentimeters = height / 100
  const bmiValue = weight / (heightInCentimeters * heightInCentimeters)
  const bmiRounded = Math.round(bmiValue * 100) / 100

  const isNumberWrongFormat = isNaN(bmiRounded) || bmiRounded === Infinity

  return isNumberWrongFormat ? 0 : bmiRounded
}

// DATA FOR SELECT
// height and weight options
type OptionType = {
  value: string
  label: string
}

// generateHeightOptions
const generateHeightOptions = () => {
  const heightArray: OptionType[] = []

  for (let i = 140; i <= 220; i++) {
    heightArray.push({
      value: `${i}`,
      label: `${i} cm`,
    })
  }

  return heightArray
}

const heightOptions = generateHeightOptions()

// generateWeightOptions
const generateWeightOptions = () => {
  const weightArray: OptionType[] = []

  for (let i = 40; i <= 140; i++) {
    weightArray.push({
      value: `${i}`,
      label: `${i} kg`,
    })
  }

  return weightArray
}

const weightOptions = generateWeightOptions()

const GRID_ITEM_WIDTH = '352px'

// Main component - BmiCalculatorForm
export const BmiCalculatorForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)

  const handleChangeHeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const heightValue = event.target.value
    setHeight(Number(heightValue))
  }

  const handleChangeWeight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const weightValue = event.target.value
    setWeight(Number(weightValue))
  }

  const personBmiValue = calculatePersonBMI(weight, height)

  /**
   * BMI health ranges
   * Below 18.5 =	Underweight
   * 18.51 - 24.99 = Healthy
   * 25.0 - 29.99 = Overweight
   * 30.0 or higher	= Obesity
   */
  type BmiHealthRanges = 'Underweight 🔵' | 'Healthy 🟢' | 'Overweight 🟡' | 'Obese 🔴' | 'Error'
  // FIXME: extract to separate file EMOJI circles and remove from TEXTS file
  const getBmiHealthRange = (): BmiHealthRanges => {
    if (personBmiValue <= 18.5) return TEXT_BMI_CALCULATOR_UNDERWEIGHT
    if (personBmiValue >= 18.51 && personBmiValue <= 24.99) return TEXT_BMI_CALCULATOR_HEALTHY
    if (personBmiValue >= 25 && personBmiValue <= 29.99) return TEXT_BMI_CALCULATOR_OVERWEIGHT
    if (personBmiValue >= 30) return TEXT_BMI_CALCULATOR_OBESE

    return TEXT_SHARED_ERROR
  }

  const showBmiInfo = personBmiValue > 0

  const sendToServer = () => {
    const userInfo = {
      username: user.user.username,
      height,
      weight,
      bmi: personBmiValue,
      healthRange: getBmiHealthRange()
    }
    dispatch(
      userBMI(userInfo)
    )
  }

  // TODO: use react-select
  // components in layout
  const SelectHeightAndWeight = () => {
    return (
      <FormControl>
        <Box mb={4}>
          <Select
            placeholder={TEXT_BMI_CALCULATOR_FORM_SELECT_PLACEHOLDER_HEIGHT}
            value={height}
            bgColor="white"
            onChange={handleChangeHeight}
          >
            {heightOptions.map((height) => {
              return (
                <option value={height.value} key={height.value}>
                  {height.label}
                </option>
              )
            })}
          </Select>
        </Box>

        <Box>
          <Select
            placeholder={TEXT_BMI_CALCULATOR_FORM_SELECT_PLACEHOLDER_WEIGHT}
            value={weight}
            bgColor="white"
            onChange={handleChangeWeight}
          >
            {weightOptions.map((weight) => {
              return (
                <option value={weight.value} key={weight.value}>
                  {weight.label}
                </option>
              )
            })}
          </Select>
        </Box>
      </FormControl>
    )
  }

  // TODO: move to separate file in components > shared
  const ButtonClearFormData = () => {
    return (
      <Box>
        <Button
          onClick={() => {
            setHeight(0)
            setWeight(0)
          }}
          type="button"
          variant="link"
          fontSize="sm"
          color="red.500"
          _hover={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {TEXT_BMI_CALCULATOR_FORM_CLEAR}
        </Button>
      </Box>
    )
  }

  const ButtonSubmitFormData = () => {
    return (
      <Box>
        <Button
          onClick={() => {
            sendToServer()
          }}
          type="button"
          variant="link"
          fontSize="sm"
          color="green.500"
          _hover={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {TEXT_BMI_CALCULATOR_FORM_SUBMIT}
        </Button>
      </Box>
    )
  }

  const BmiReport = () => {
    return (
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {TEXT_BMI_CALCULATOR_HEIGHT}
              </Heading>
              <Text pt="2" fontSize="sm">
                {height} {TEXT_SHARED_UNITS_CM}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {TEXT_BMI_CALCULATOR_WEIGHT}
              </Heading>
              <Text pt="2" fontSize="sm">
                {weight} {TEXT_SHARED_UNITS_KG}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {TEXT_BMI}
              </Heading>
              <Text pt="2" fontSize="sm">
                {personBmiValue}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {TEXT_BMI_CALCULATOR_HEALTH_RANGE}
              </Heading>
              <Text pt="2" fontSize="sm">
                {showBmiInfo ? (
                  <>
                    {TEXT_BMI_CALCULATOR_RESULT}{' '}
                    <Text as="span" fontWeight="bold">
                      {getBmiHealthRange()}
                    </Text>
                  </>
                ) : (
                  TEXT_BMI_CALCULATOR_RESULT_ENTER_DATA
                )}
              </Text>
            </Box>
            <Stack direction='row' justifyContent='space-between'>
              <ButtonClearFormData />
              <ButtonSubmitFormData />
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    )
  }

  return (
    <>
      <Grid
        gap={8}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 360px)',
        }}
      >
        <GridItem width={{ base: '100%', md: GRID_ITEM_WIDTH }}>
          <Text mb={2}>
            <Box as="span" fontWeight="bold">
              {TEXT_BMI_CALCULATOR_METRIC_SYSTEM}
            </Box>
          </Text>
          <SelectHeightAndWeight />
        </GridItem>

        <GridItem width={{ base: '100%', md: GRID_ITEM_WIDTH }}>
          <Text mb={2}>
            <Box as="span" fontWeight="bold">
              {TEXT_BMI_REPORT}
            </Box>
          </Text>
          <BmiReport />
        </GridItem>
      </Grid>
    </>
  )
}
