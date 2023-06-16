import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import { TEXT_HOME_DESCRIPTION, TEXT_HOME_TITLE } from "../localization/texts";

import { PageContent } from "../layout";
import { useAppSelector } from "../app/hooks";
import MiniStatistics from "../components/card/MiniStatistics";
import IconBox from "../components/icons/IconBox";

const MAX_CONTENT_WIDTH = "1000px";

// TODO: data-test-id get from json file
export const Home = () => {
  const user = useAppSelector((state) => state.user);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <PageContent
      pageHeading={TEXT_HOME_TITLE}
      pageDescription={TEXT_HOME_DESCRIPTION}
      dataTestId="heading-home"
    >
      <Box mb={8}>
        <Text>{user.user.username}</Text>
      </Box>

      <Grid
        maxWidth={MAX_CONTENT_WIDTH}
        gap={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem>
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
                }
              />
            }
            name="BMI"
            value={String(user.user.bmi)}
          />
        </GridItem>
        <GridItem>
          <Card maxWidth="md" p={4}>
            <CardBody>
              <Box>
                <Stack spacing={4} direction={["column", "row"]}>
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={MdBarChart}
                        color={brandColor}
                      />
                    }
                  />
                  <Text>{String(user.user.bmi)}</Text>
                </Stack>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card maxWidth="md" p={4}>
            <CardBody>
              <Box>no. of workouts this week</Box>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card maxWidth="md" p={4}>
            <CardBody>
              <Box>no. of workouts this month</Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageContent>
  );
};
