"use client";

/**
 * In-code product screens (real UI: sidebars, KPIs, charts, tables, kanban,
 * calendar). Not icons/illustrations. Each screen is presentational only.
 *
 * To use a real screenshot instead, render <img loading="lazy" .../> in place
 * of <SystemScreen .../> — the surrounding card markup stays identical.
 */

export type SystemScreenType =
  | "dashboard"
  | "finance"
  | "employees"
  | "diary"
  | "tasks"
  | "crm"
  | "inventory"
  | "ai";

const RAIL = 5;

function Chrome({
  title,
  type,
  children,
}: {
  title: string;
  type: SystemScreenType;
  children: React.ReactNode;
}) {
  return (
    <div className={`lp-scr lp-scr--${type}`} role="img" aria-label={title}>
      <div className="lp-scr__chrome">
        <span className="lp-scr__dots" aria-hidden>
          <i /><i /><i />
        </span>
        <span className="lp-scr__title">{title}</span>
        <span className="lp-scr__live" aria-hidden>
          <span className="lp-scr__live-dot" />
        </span>
      </div>
      <div className="lp-scr__app">
        <div className="lp-scr__rail" aria-hidden>
          {Array.from({ length: RAIL }).map((_, i) => (
            <span key={i} className={`lp-scr__rail-item${i === 0 ? " is-active" : ""}`} />
          ))}
        </div>
        <div className="lp-scr__view">{children}</div>
      </div>
    </div>
  );
}

function Bars({ heights, peak }: { heights: number[]; peak?: boolean }) {
  return (
    <div className="lp-scr__bars" aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`lp-scr__bar${peak && i === heights.length - 1 ? " is-peak" : ""}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function Avatar({ label, tone }: { label: string; tone?: number }) {
  return (
    <span className="lp-scr__avatar" data-tone={tone ?? 0} aria-hidden>
      {label}
    </span>
  );
}

export function SystemScreen({ type, title }: { type: SystemScreenType; title: string }) {
  return (
    <Chrome type={type} title={title}>
      {type === "dashboard" ? <ScreenDashboard /> : null}
      {type === "finance" ? <ScreenFinance /> : null}
      {type === "employees" ? <ScreenEmployees /> : null}
      {type === "diary" ? <ScreenDiary /> : null}
      {type === "tasks" ? <ScreenTasks /> : null}
      {type === "crm" ? <ScreenCrm /> : null}
      {type === "inventory" ? <ScreenInventory /> : null}
      {type === "ai" ? <ScreenAi /> : null}
    </Chrome>
  );
}

function ScreenDashboard() {
  return (
    <div className="lp-scr-dash">
      <div className="lp-scr__kpis">
        <div className="lp-scr__kpi"><small /><b style={{ width: "60%" }} /><em className="up" /></div>
        <div className="lp-scr__kpi"><small /><b style={{ width: "72%" }} /><em className="down" /></div>
        <div className="lp-scr__kpi"><small /><b style={{ width: "50%" }} /><em className="up" /></div>
      </div>
      <div className="lp-scr__panel">
        <Bars heights={[40, 58, 46, 70, 62, 88]} peak />
      </div>
      <div className="lp-scr__split">
        <div className="lp-scr__donut" aria-hidden />
        <div className="lp-scr__rows">
          {[0, 1, 2].map((i) => (
            <span key={i} className="lp-scr__line-row"><i /><b style={{ width: `${70 - i * 12}%` }} /></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenFinance() {
  return (
    <div className="lp-scr-fin">
      <div className="lp-scr__kpis">
        <div className="lp-scr__kpi lp-scr__kpi--lg"><small /><b style={{ width: "55%" }} /><em className="up" /></div>
        <div className="lp-scr__kpi lp-scr__kpi--lg"><small /><b style={{ width: "68%" }} /><em className="down" /></div>
      </div>
      <div className="lp-scr__panel">
        <Bars heights={[52, 38, 64, 48, 80, 60, 92]} peak />
      </div>
      <div className="lp-scr__table">
        {[0, 1, 2].map((i) => (
          <span key={i} className="lp-scr__tr">
            <i className="lp-scr__td-ic" />
            <b style={{ width: `${44 - i * 6}%` }} />
            <u style={{ width: "18%" }} />
            <em className={i === 1 ? "down" : "up"} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenEmployees() {
  const people = ["דל", "מר", "אב", "סי"];
  return (
    <div className="lp-scr-emp">
      <div className="lp-scr__panel lp-scr__panel--soft">
        <Bars heights={[70, 84, 60, 92, 78]} />
      </div>
      <div className="lp-scr__people">
        {people.map((p, i) => (
          <span key={i} className="lp-scr__person">
            <Avatar label={p} tone={i} />
            <b style={{ width: `${55 - i * 7}%` }} />
            <span className={`lp-scr__pill ${i % 3 === 2 ? "off" : "on"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenDiary() {
  const days = [0, 1, 2, 3, 4];
  const blocks: Record<number, number[]> = { 0: [1], 1: [0, 2], 2: [1], 3: [0, 1], 4: [2] };
  return (
    <div className="lp-scr-diary">
      <div className="lp-scr__cal-head">
        {days.map((d) => (
          <span key={d} className="lp-scr__cal-day" />
        ))}
      </div>
      <div className="lp-scr__cal-grid">
        {days.map((d) => (
          <span key={d} className="lp-scr__cal-col">
            {[0, 1, 2].map((r) => (
              <i
                key={r}
                className={`lp-scr__cal-slot${blocks[d]?.includes(r) ? ` fill t${(d + r) % 3}` : ""}`}
              />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenTasks() {
  const cols = [3, 2, 2];
  return (
    <div className="lp-scr-kanban">
      {cols.map((n, c) => (
        <span key={c} className="lp-scr__kcol">
          <i className="lp-scr__kcol-head" />
          {Array.from({ length: n }).map((_, k) => (
            <span key={k} className={`lp-scr__kcard t${(c + k) % 3}`}>
              <b style={{ width: `${75 - k * 12}%` }} />
              <u />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

function ScreenCrm() {
  const cols = [2, 2, 1];
  return (
    <div className="lp-scr-crm">
      {cols.map((n, c) => (
        <span key={c} className="lp-scr__pcol">
          <i className="lp-scr__pcol-head" />
          {Array.from({ length: n }).map((_, k) => (
            <span key={k} className="lp-scr__lead">
              <Avatar label={["א", "ב", "ג", "ד"][(c + k) % 4]!} tone={c + k} />
              <b style={{ width: `${60 - k * 10}%` }} />
              <u style={{ width: "30%" }} />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

function ScreenInventory() {
  const rows = [82, 46, 64, 22];
  return (
    <div className="lp-scr-inv">
      {rows.map((v, i) => (
        <span key={i} className="lp-scr__inv-row">
          <i className="lp-scr__inv-ic" />
          <b style={{ width: `${40 - i * 4}%` }} />
          <span className="lp-scr__inv-bar">
            <em style={{ width: `${v}%` }} className={v < 30 ? "low" : ""} />
          </span>
          <u className={v < 30 ? "low" : ""} />
        </span>
      ))}
    </div>
  );
}

function ScreenAi() {
  return (
    <div className="lp-scr-ai">
      <span className="lp-scr__msg in"><i /><b style={{ width: "70%" }} /></span>
      <span className="lp-scr__msg out"><b style={{ width: "85%" }} /><u style={{ width: "55%" }} /></span>
      <span className="lp-scr__ai-card">
        <i className="lp-scr__ai-spark" />
        <b style={{ width: "60%" }} />
        <u style={{ width: "80%" }} />
      </span>
      <span className="lp-scr__ai-input" />
    </div>
  );
}
