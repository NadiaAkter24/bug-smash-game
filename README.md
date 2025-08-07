Step-by-step to publish your Bug Smash game on GitHub Pages:
1. Prepare your project folder locally
Make sure your project folder has these files at minimum:

index.html (your HTML file)

style.css (your CSS file)

script.js (your JavaScript file)

BUG.jpeg (bug image)

smash.wav (or your sound file)

2. Initialize Git locally (if not already done)
Open your terminal or command prompt inside your project folder, then:

bash
Copy
Edit
git init
git add .
git commit -m "Initial commit: Bug Smash game"
3. Connect your local repo to the GitHub remote repository
Replace YOUR_GITHUB_USERNAME and YOUR_REPOSITORY_NAME with your actual GitHub username and repo name.

bash
Copy
Edit
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
4. Push your code to GitHub
bash
Copy
Edit
git branch -M main
git push -u origin main
5. Enable GitHub Pages on your repository
Go to your GitHub repo webpage.

Click on Settings tab.

Scroll down to Pages (or find "Pages" on the sidebar).

Under Source, select the branch: main (or master if that’s your branch) and folder /root (if your files are in root folder).

Click Save.

6. Wait for a moment, then access your live site
GitHub will provide you a URL like:

cpp
Copy
Edit
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
Open that link in your browser — your game should be live!

Optional: Update your repo later
Whenever you update your code locally, do:

bash
Copy
Edit
git add .
git commit -m "Describe your update"
git push
Changes will auto-deploy on GitHub Pages.

