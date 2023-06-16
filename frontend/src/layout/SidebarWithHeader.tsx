import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  FaBars,
  FaBell,
  FaChartLine,
  FaCog,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { LAYOUT_CONTENT, LAYOUT_SIDEBAR_WIDTH } from "../config/constants";
import {
  ROUTE_ABOUT,
  ROUTE_BMI_CALCULATOR,
  ROUTE_HOME,
  ROUTE_PROFILE,
  ROUTE_SETTINGS,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_OUT,
  ROUTE_SIGN_UP,
} from "../config/routes";
import {
  TEXT_APP_NAME,
  TEXT_NAV_ABOUT,
  TEXT_NAV_BMI_CALCULATOR,
  TEXT_NAV_HOME,
  TEXT_NAV_PROFILE,
  TEXT_NAV_SETTINGS,
  TEXT_NAV_SIGN_IN,
  TEXT_NAV_SIGN_OUT,
  TEXT_NAV_SIGN_UP,
  TEXT_SHARED_PROFILE,
  TEXT_SHARED_SIGN_OUT,
} from "../localization/texts";

import { OpenDevToolsButton } from "../components/devtools/OpenDevToolsButton";
import { Logo } from "../components/Logo";
import profile from "../img/user.png";
import { Footer } from "./Footer";
import { useAppSelector } from "../app/hooks";

interface SidebarMenuItemProps {
  icon: IconType;
  route: string;
  text: string;
}

const SidebarMenuItems: Array<SidebarMenuItemProps> = [
  { route: ROUTE_HOME, text: TEXT_NAV_HOME, icon: FaHome },
  {
    route: ROUTE_BMI_CALCULATOR,
    text: TEXT_NAV_BMI_CALCULATOR,
    icon: FaChartLine,
  },
  { route: ROUTE_ABOUT, text: TEXT_NAV_ABOUT, icon: FaInfoCircle },
  { route: ROUTE_SETTINGS, text: TEXT_NAV_SETTINGS, icon: FaCog },
  { route: ROUTE_PROFILE, text: TEXT_NAV_PROFILE, icon: FaUser },
  { route: ROUTE_SIGN_IN, text: TEXT_NAV_SIGN_IN, icon: FaSignInAlt },
  { route: ROUTE_SIGN_OUT, text: TEXT_NAV_SIGN_OUT, icon: FaSignOutAlt },
];

export const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      {/* SIDEBARCONTENT */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      {/* DRAWER */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* MOBILE NAVIGATION */}
      <MobileNav onOpen={onOpen} />

      {/* CHILDREN */}
      <Box ml={{ base: 0, md: LAYOUT_CONTENT }} pb={10}>
        {children}
      </Box>

      {/* DevTools */}
      {/* <OpenDevToolsButton /> */}

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      width={{ base: "full", md: LAYOUT_SIDEBAR_WIDTH }}
      position="fixed"
      height="full"
      {...rest}
    >
      <Flex
        alignItems="center"
        py={4}
        px={8}
        height={20}
        justifyContent="space-between"
      >
        {/* Desktop */}
        <Flex alignItems="center">
          <Logo boxSize="sm" />
          <Text fontSize="md" fontFamily="monospace" fontWeight="bold" ml={4}>
            {TEXT_APP_NAME}
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <nav>
        <UnorderedList
          listStyleType="none"
          display="flex"
          flexDirection="column"
          ml={0}
          pt={1}
          px={4}
        >
          {SidebarMenuItems.filter((link) => {
            const user = useAppSelector((state) => state.user);
            if (user.user.username && link.route === ROUTE_SIGN_IN) {
              return false;
            } else if (!user.user.username && link.route === ROUTE_SIGN_OUT) {
              return false;
            }
            return true;
          }).map((link) => {
            return (
              <SidebarMenuItem
                key={link.text}
                route={link.route}
                icon={link.icon}
              >
                {link.text}
              </SidebarMenuItem>
            );
          })}
        </UnorderedList>
      </nav>
    </Box>
  );
};

interface ItemProps extends FlexProps {
  icon: IconType;
  route: string;
  children: React.ReactNode;
}

const SidebarMenuItem = ({ icon, route, children, ...rest }: ItemProps) => {
  return (
    <ListItem>
      <NavLink
        to={route}
        style={({ isActive }) =>
          isActive ? { fontWeight: "bold" } : undefined
        }
      >
        <Flex
          align="center"
          py={2}
          px={4}
          mb={1}
          borderRadius="lg"
          cursor="pointer"
          userSelect="none"
          _hover={{
            bg: "green.200",
          }}
          {...rest}
        >
          {icon && <Icon mr="2" fontSize="16" as={icon} />}
          {children}
        </Flex>
      </NavLink>
    </ListItem>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: LAYOUT_CONTENT }}
      py={4}
      px={8}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      height={20}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FaBars />}
        bg="white"
        mr={2}
      />

      {/* MobileNav */}
      <Box display={{ base: "flex", md: "none" }}>
        <Logo boxSize="sm" />
      </Box>
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        ml={1}
      >
        {TEXT_APP_NAME}
      </Text>
      <HStack spacing={4}>
        // TODO: remove make link to page /news (list of features there) and
        change aria label
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FaBell />}
        />
        <Flex
          alignItems={"center"}
          borderRadius="md"
          px={2}
          _hover={{
            backgroundColor: "gray.100",
          }}
        >
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={profile} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              py={2}
              px={0}
            >
              <MenuItem>{TEXT_SHARED_PROFILE}</MenuItem>
              <MenuDivider />
              <MenuItem>{TEXT_SHARED_SIGN_OUT}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
