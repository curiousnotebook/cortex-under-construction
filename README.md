# Cortex Under Construction

*Learning a little. Questioning a lot. Growing every day.*

An anonymous, independent knowledge journal. This is a plain static website (HTML, CSS and JavaScript only), hosted free on GitHub Pages. No database, no server, no accounts.

---

## What each file does

| File | What it is | Will I edit it? |
|---|---|---|
| `index.html` | The homepage | Rarely (intro text) |
| `articles.html` | All articles, with search and topic filters | Rarely |
| `about.html` | The About page | Sometimes |
| `404.html` | "Page not found" page | No |
| `article-*.html` | One file per article | Yes, when writing |
| `article-template.html` | A blank article to copy | No (just copy it) |
| `articles-list.js` | **The list of all articles** | **Yes, every new article** |
| `style.css` | Colours, fonts, layout | Only to change the look |
| `script.js` | Menu, search, cards | No |
| `favicon.svg` | The little sprout icon in the browser tab | No |
| `discussion.js` | Reactions, discussion and author sign-in | Only to change the reactions |
| `firebase-config.js` | Your Firebase settings (pasted once) | Once, during setup |
| `firestore-rules.txt` | Security rules to paste into Firebase | Once, during setup |
| `login.html` | Your author sign-in page (not in the menu) | No |

---

## How to add a new article (about 10 minutes)

1. **Create the page.** In your GitHub repository, open `article-template.html`, click the copy icon to copy all of it. Then click **Add file → Create new file**, name it something like `article-why-we-sleep.html` (lowercase, hyphens, ending in `.html`), and paste.
2. **Write.** Replace everything in CAPITALS with your own text. Change the `<title>` and `description` near the top of the file. Delete the yellow "template" box. Click **Commit changes**.
3. **List it.** Open `articles-list.js`, click the pencil icon to edit, copy one existing article block (from `{` to `},`), paste it at the top of the list, and change the details: `id`, `title`, `description`, `category`, `readingTime`, `date`, `file`, `featured`, `keywords`, `related`.
4. In your new article file, set `data-current="..."` (near the bottom) to the same `id`.
5. Commit. Your site updates within a minute or two.

**Reading time:** roughly the number of words divided by 200.

**To feature an article on the homepage:** set `featured: true`. The homepage shows up to three featured articles; the newest ones go first.

---

## Reactions and discussion

Every article ends with five reactions and a discussion section. Readers join with only a display name (no email or password); their account is kept in their browser. Comments, reactions and names are stored in **Firebase** (Google's free Spark plan, no card needed).

- **Your sign-in page:** `https://curiousnotebook.github.io/cortex-under-construction/login.html` (bookmark it; it isn't in the menu).
- **Moderating:** sign in, open any article, and use **Delete** under any comment. You can also delete comments in Firebase → Firestore Database → Data.
- **Built-in protection:** readers can post at most once every 30 seconds, comments are limited to 2,000 characters, comments can't be edited after posting, and readers can't choose names containing *cortex*, *admin*, *author* or *moderator*.
- **New articles:** the discussion section is in the template. Set its `data-article="..."` to the article's id from `articles-list.js`.
- **Free limits:** about 50,000 reads and 20,000 writes per day. If a very busy day ever uses these up, the discussion pauses until the next day; the rest of the site keeps working.

## Common fixes

- **The homepage cards disappeared.** There's almost certainly a small typo in `articles-list.js`: a missing comma, quotation mark or bracket. Compare your new block carefully with the one below it.
- **A link doesn't work.** Check that the file name in the link matches the real file name exactly, including capital letters.
- **The menu or header needs changing.** The header and footer are repeated at the top and bottom of every `.html` file, so change them in each file.
- **The discussion section doesn't appear.** Check `firebase-config.js`: the pasted block must start with `const firebaseConfig = {` and end with `};`.
- **Changing colours.** Open `style.css` and edit the colour codes in the `:root` section at the top.

---

## Writing principles for this journal

- Explain plainly; define jargon.
- Only cite sources you have actually read and checked. Never invent a reference.
- Separate what is well established from what is still uncertain.
- Medical content is educational, not personal advice.
- Keep the journal anonymous: no names, photos, workplaces or identifying details.
