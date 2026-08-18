"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import NextLink from "next/link";
import {
  NAV,
  NavGlyph,
  type NavCol,
  type NavItem,
  type NavLink as NavDataLink,
} from "../_shared/nav-data";

type Theme = "light" | "dark";

const HEADER_ITEMS = NAV.filter((item) =>
  ["Platform", "Products", "Solutions", "Resources"].includes(item.label),
);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? <path d="M5 15 15 5M7 5h8v8" /> : <path d="M3.5 10h13M12 5.5l4.5 4.5-4.5 4.5" />}
    </svg>
  );
}

function Caret() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4.5 6 3.5 3.5L11.5 6" />
    </svg>
  );
}

function MenuLink({ item }: { item: NavDataLink }) {
  return (
    <NavigationMenu.Link
      className="sf-nav-panel__link"
      render={<NextLink href={item.href} />}
    >
      {item.icon ? (
        <span className="sf-nav-panel__link-icon">
          <NavGlyph name={item.icon} />
        </span>
      ) : null}
      <span className="sf-nav-panel__link-copy">
        <span className="sf-nav-panel__link-heading">
          {item.code ? <small>{item.code}</small> : null}
          <b>{item.label}</b>
        </span>
        {item.desc ? <span>{item.desc}</span> : null}
      </span>
      <Arrow />
    </NavigationMenu.Link>
  );
}

function ProductPanel({ item }: { item: NavItem }) {
  return (
    <div className="sf-nav-panel sf-nav-panel--products">
      <ul className="sf-nav-panel__product-grid">
        {(item.items ?? []).map((link) => (
          <li key={link.label}>
            <MenuLink item={link} />
          </li>
        ))}
      </ul>
      {item.foot ? (
        <NavigationMenu.Link
          className="sf-nav-panel__footer"
          render={<NextLink href={item.foot.href} />}
        >
          <span>
            <b>{item.foot.title}</b>
            <small>{item.foot.desc}</small>
          </span>
          <span>{item.foot.cta} <Arrow /></span>
        </NavigationMenu.Link>
      ) : null}
    </div>
  );
}

function SolutionColumn({ column }: { column: NavCol }) {
  return (
    <section className="sf-nav-panel__solution-column">
      <header>
        <NavGlyph name={column.icon} />
        <span>{column.heading}</span>
      </header>
      <ul>
        {column.items.slice(0, 2).map((link) => (
          <li key={link.label}>
            <NavigationMenu.Link render={<NextLink href={link.href} />}>
              <b>{link.label}</b>
              <span>{link.desc}</span>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SolutionsPanel({ item }: { item: NavItem }) {
  return (
    <div className="sf-nav-panel sf-nav-panel--solutions">
      <div className="sf-nav-panel__solution-grid">
        {(item.cols ?? []).map((column) => (
          <SolutionColumn column={column} key={column.heading} />
        ))}
      </div>
      {item.foot ? (
        <NavigationMenu.Link
          className="sf-nav-panel__footer"
          render={<NextLink href={item.foot.href} />}
        >
          <span>
            <b>{item.foot.title}</b>
            <small>{item.foot.desc}</small>
          </span>
          <span>{item.foot.cta} <Arrow /></span>
        </NavigationMenu.Link>
      ) : null}
    </div>
  );
}

function ResourcesPanel({ item }: { item: NavItem }) {
  return (
    <div className="sf-nav-panel sf-nav-panel--resources">
      <ul className="sf-nav-panel__resource-list">
        {(item.items ?? []).map((link) => (
          <li key={link.label}>
            <MenuLink item={link} />
          </li>
        ))}
      </ul>
      {item.foot ? (
        <NavigationMenu.Link
          className="sf-nav-panel__footer"
          render={<NextLink href={item.foot.href} />}
        >
          <span>
            <b>{item.foot.title}</b>
            <small>{item.foot.desc}</small>
          </span>
          <span>{item.foot.cta} <Arrow /></span>
        </NavigationMenu.Link>
      ) : null}
    </div>
  );
}

function MenuPanel({ item }: { item: NavItem }) {
  if (item.menu === "products") return <ProductPanel item={item} />;
  if (item.menu === "domains") return <SolutionsPanel item={item} />;
  return <ResourcesPanel item={item} />;
}

function mobileHref(item: NavItem) {
  return item.href ?? item.items?.[0]?.href ?? item.cols?.[0]?.items[0]?.href ?? "/";
}

export function SignalHeader({ theme }: { theme: Theme }) {
  const logo = theme === "dark" ? "/logo_light.svg" : "/logo_dark.svg";

  return (
    <header className={`sf-header sf-header--${theme}`}>
      <div className="sf-shell sf-header__inner">
        <NextLink className="sf-header__brand" href="/explorations/signal-field/home" aria-label="Unifize home">
          <img src={logo} alt="Unifize" width="126" height="29" />
        </NextLink>

        <NavigationMenu.Root
          aria-label="Primary navigation"
          className="sf-header__nav"
          closeDelay={120}
          delay={80}
        >
          <NavigationMenu.List className="sf-nav-menu__list">
            {HEADER_ITEMS.map((item) => (
              <NavigationMenu.Item key={item.label}>
                {item.menu ? (
                  <>
                    <NavigationMenu.Trigger className="sf-nav-menu__trigger">
                      {item.label}
                      <NavigationMenu.Icon className="sf-nav-menu__icon">
                        <Caret />
                      </NavigationMenu.Icon>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={`sf-nav-menu__content is-${item.menu}`}>
                      <MenuPanel item={item} />
                    </NavigationMenu.Content>
                  </>
                ) : (
                  <NavigationMenu.Link
                    className="sf-nav-menu__direct"
                    render={<NextLink href={item.href ?? "/"} />}
                  >
                    {item.label}
                  </NavigationMenu.Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              className="sf-nav-menu__positioner"
              sideOffset={12}
              collisionPadding={{ top: 12, right: 20, bottom: 12, left: 20 }}
            >
              <NavigationMenu.Popup className={`sf-nav-menu__popup is-${theme}`}>
                <NavigationMenu.Arrow className="sf-nav-menu__arrow" />
                <NavigationMenu.Viewport className="sf-nav-menu__viewport" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <NextLink className="sf-header__demo" href="/chat-anatomy">
          Book a demo <Arrow diagonal />
        </NextLink>

        <details className="sf-header__mobile">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {HEADER_ITEMS.map((item) => (
              <NextLink key={item.label} href={mobileHref(item)}>
                {item.label}
              </NextLink>
            ))}
            <NextLink className="sf-header__mobile-demo" href="/chat-anatomy">
              Book a demo <Arrow diagonal />
            </NextLink>
          </nav>
        </details>
      </div>
    </header>
  );
}
