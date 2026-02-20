import type { FC } from "react";
import ClientTabs from "@/src/components/bottom-nav-bar-section/ClientNavBar";
import LeadASTabs from "@/src/components/bottom-nav-bar-section/Employee/LeadASNavBar";
import MarketingTabs from "@/src/components/bottom-nav-bar-section/Employee/MarketingNavBar";
import DarkHeader from "@/src/components/header-nav-bar-section/DarkHeader";
import LightHeader from "@/src/components/header-nav-bar-section/LightHeader";
import type { UserRole } from "../types/auth";
import { routes } from "./routes";

export type HeaderMenu = {
	text: string;
	link: (typeof routes)[keyof typeof routes];
};

type HeaderProps = {
	menus: HeaderMenu[];
};

type UserNavigation = {
	role: UserRole;
	headerComponent: FC<HeaderProps>;
	tabsComponent: FC;
	headerMenus: HeaderMenu[];
};

export const userNavigation: UserNavigation[] = [
	{
		role: "Client",
		headerComponent: DarkHeader,
		tabsComponent: ClientTabs,
		headerMenus: [
			// {
			// 	text: "Calculator",
			// 	link: routes.CLIENT_DB,
			// },
			{
				text: "AHTN Checker",
				link: routes.AHTN,
			},
			// {
			// 	text: "Account Settings",
			// 	link: routes.CLIENT_DB,
			// },
		],
	},
	{
		role: "Account Specialist",
		headerComponent: LightHeader,
		tabsComponent: LeadASTabs,
		headerMenus: [
			{
				text: "Calculator",
				link: routes.AS_DB,
			},
			{
				text: "AHTN Checker",
				link: routes.AHTN,
			},
			{
				text: "Account Settings",
				link: routes.AS_DB,
			},
		],
	},
	{
		role: "Marketing",
		headerComponent: LightHeader,
		tabsComponent: MarketingTabs,
		headerMenus: [
			{
				text: "Calculator",
				link: routes.CLIENT_DB,
			},
			{
				text: "AHTN Checker",
				link: routes.AHTN,
			},
			{
				text: "Account Settings",
				link: routes.CLIENT_DB,
			},
		],
	},
	{
		role: "Human Resource",
		headerComponent: LightHeader,
		tabsComponent: ClientTabs,
		headerMenus: [
			{
				text: "Calculator",
				link: routes.CLIENT_DB,
			},
			{
				text: "AHTN Checker",
				link: routes.AHTN,
			},
			{
				text: "Account Settings",
				link: routes.CLIENT_DB,
			},
		],
	},
];
