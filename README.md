# חנות אונליין - צד לקוח

פרויקט צד לקוח לחנות אונליין, המציג מוצרים ומאפשר ניהול סל קניות.

## טכנולוגיות

- React + TypeScript
- Redux Toolkit לניהול state
- React Router לניהול ניווט
- Tailwind CSS לעיצוב
- Axios לביצוע קריאות API
- Docker לקונטיינריזציה
- Nginx כשרת ווב

## תכונות

- הצגת רשימת מוצרים מ-Fake Store API
- הוספה והסרה של מוצרים מסל הקניות
- עדכון כמויות בסל
- ממשק משתמש בעברית עם תמיכה ב-RTL
- תצוגה מותאמת למובייל

## הוראות הרצה

### הרצה עם Docker

1. וודא שיש לך Docker ו-Docker Compose מותקנים
2. הרץ את הפקודה:
```bash
docker-compose up
```

האפליקציה תרוץ בכתובת: http://localhost

### הרצה לוקלית לפיתוח

1. התקן את ה-dependencies:
```bash
cd client
npm install
```

2. הרץ את הפרויקט:
```bash
npm run dev
```

## מבנה הפרויקט

```
.
├── client/              # צד לקוח
│   ├── src/
│   │   ├── components/  # קומפוננטות React
│   │   ├── store/      # הגדרות Redux
│   │   ├── services/   # שירותי API
│   │   ├── types/      # הגדרות TypeScript
│   │   └── pages/      # דפי האפליקציה
│   ├── public/         # קבצים סטטיים
│   ├── Dockerfile      # הגדרות Docker לצד לקוח
│   └── nginx.conf      # הגדרות Nginx
├── server/             # צד שרת
│   └── Dockerfile      # הגדרות Docker לצד שרת
└── docker-compose.yaml # הגדרות Docker Compose
```

## שירותים

הפרויקט כולל שלושה שירותים:
1. **client** - צד לקוח (פורט 80)
2. **server** - צד שרת (פורט 4000)
3. **redis** - בסיס נתונים (פורט 6379)

## רשתות Docker

- **app-network** - לתקשורת בין client ו-server
- **redis-network** - לתקשורת בין server ו-redis

## API Endpoints

- `GET /products` - קבלת רשימת מוצרים
- `GET /basket` - קבלת תוכן סל הקניות
- `POST /basket` - הוספת מוצר לסל
- `PUT /basket/:id` - עדכון כמות מוצר בסל 
- `DELETE /basket/:id` - הסרת מוצר מהסל