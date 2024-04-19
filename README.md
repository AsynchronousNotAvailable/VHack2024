### Environment Variables: 
1. At nest/: <br>
DATABASE_URL

2. at root directory: <br>
DATABASE_URL <br>
DIRECT_URL <br>
SUPABASE_URL <br>
SUPABASE_KEY <br>
OPENAI_API_KEY <br>

## Steps To Run Debt Free:
### Frontend (React Native Expo App)
1. `git clone https://github.com/AsynchronousNotAvailable/VHack2024.git`
3. `cd frontend`
4. `npm install --force`
5. `npm run start`
6. `a` to run in android simulator (For best UI/UX experience in DebtFree, we recommend you to use ***Android Pixel 7 Pro, API Level 34*** to run our app on emulator, or ***scan the QR code*** using android or IOS physical devices)

### Backend (Nest)
1. `cd nest`
2. `npm install`
3. `prisma generate`
4. `npm run start:dev`

### Gen AI Server (Django)
1. `cd django`
2. `cd vhack`
3. `pip install -r requirements.txt`
4. Go to `settings.py`, add ip address of your local machine in ALLOWED_HOSTS
5. `python manage.py runserver [IP_ADDRESS]:8000`

Congratulations! You are now able to enjoy DebtFree. 😬
![alt text](https://github.com/AsynchronousNotAvailable/VHack2024/blob/main/DebtFree.png?raw=true)


