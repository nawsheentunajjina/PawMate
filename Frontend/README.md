# Pawmate (frontend)

Report injured or sick stray dogs and cats. Volunteers nearby take the case and post updates until the animal is treated.

All data here is **sample data** saved in your browser (localStorage), so you can click through every page before the backend is connected.

## Run it
Put these files in your `frontend` folder (the Express server serves it), then open `http://localhost:5000/index.html`.
Without a backend you can also use VS Code **Live Server** on `index.html`. Internet is needed once for the map and fonts.

## Pages
| Group | Files |
|---|---|
| Core | index (map), report, details, login, signup |
| Tabs | my-cases, explore, profile |
| Phase 1 | dashboard (volunteer), safety |
| Phase 2 | vets, contacts, about, notifications, impact |
| Phase 3 | adoption, adopt-details, donate, vet-partners, lostfound, feeding |
| Admin | admin, analytics |

Shared code: `css/style.css`, `js/data.js` (storage + sample data + auth helper), `js/nav.js` (tab bar, top bar, small components).

## Auth
`signup.js` and `login.js` call `/api/auth/signup` and `/api/auth/login`. If the server or the route is missing, they fall back to a demo login so the UI keeps working.

## Where to attach the backend
| Page / function | Replace with |
|---|---|
| `getReports()` / `saveReports()` in `data.js` | `GET/POST /api/reports`, `PUT /api/reports/:id/help`, `POST /api/reports/:id/updates` |
| `ADOPTIONS`, `pawmate_adopt_requests` | `GET /api/adoptions`, `POST /api/adoptions/:id/requests` |
| `FUNDS`, `pawmate_donations` | `GET /api/funds`, `POST /api/donations` |
| `LOSTFOUND` | `GET/POST /api/lostfound` |
| `VETS`, `FEEDING`, `CONTACTS` | `GET /api/vets`, `/api/feeding`, `/api/contacts` |
| `NOTIFS` | `GET /api/notifications` |
| `ADMIN_USERS`, admin and analytics pages | `/api/admin/*` (admin role only) and MongoDB aggregation |

Do this one page at a time. Reset demo data: DevTools > Application > Local Storage > clear the `pawmate_` keys.
