# Guide: Setting Up Google Search Console & Submitting Your Sitemap

This guide provides step-by-step instructions for setting up Google Search Console for your website, `awoyaa.com`. This is a critical step for monitoring your site's performance in Google Search and identifying technical issues.

---

### What You Will Need

*   A Google Account.
*   Access to your website's hosting or domain name provider to verify ownership.

---

### Part 1: Setting Up Google Search Console

1.  **Go to Google Search Console**:
    *   Open your web browser and navigate to [https://search.google.com/search-console](https://search.google.com/search-console).
    *   Sign in with your Google account.

2.  **Add Your Website as a Property**:
    *   In the property selector (top-left dropdown), click **"Add property"**.
    *   You will see two options: **Domain** and **URL prefix**. For comprehensive tracking, it is highly recommended to use the **Domain** option.
    *   In the **Domain** box, enter `awoyaa.com` and click **"Continue"**.

3.  **Verify Your Domain Ownership**:
    *   Google needs to confirm that you own the domain. It will provide you with a **TXT record** (e.g., `google-site-verification=...`).
    *   You must add this TXT record to your domain's DNS configuration.
    *   **How to add a TXT record**:
        1.  Log in to your domain name provider (e.g., GoDaddy, Namecheap, Bluehost).
        2.  Navigate to the DNS management or DNS settings section for `awoyaa.com`.
        3.  Create a new DNS record with the following settings:
            *   **Type**: `TXT`
            *   **Host/Name**: `@` (or leave it blank, depending on your provider)
            *   **Value/Content**: Paste the entire TXT record you copied from Google Search Console.
            *   **TTL (Time to Live)**: Leave the default setting.
        4.  Save the new record.

4.  **Complete Verification in Search Console**:
    *   DNS changes can take some time to propagate (from a few minutes to a few hours).
    *   Once you've added the TXT record, go back to the Google Search Console verification page and click the **"Verify"** button. If it doesn't work immediately, wait a while and try again.
    *   Once successful, you will have access to the Search Console dashboard for `awoyaa.com`.

---

### Part 2: Submitting Your Sitemap

Now that your site is verified, you need to tell Google where to find your sitemap. This helps Google crawl your site more intelligently.

1.  **Navigate to Sitemaps**:
    *   In your Google Search Console dashboard, click on **"Sitemaps"** in the left-hand menu.

2.  **Add a New Sitemap**:
    *   Under **"Add a new sitemap"**, you will see your domain (`https://awoyaa.com/`).
    *   In the text box, simply type `sitemap.xml`.
    *   The full URL should read `https://awoyaa.com/sitemap.xml`.

3.  **Submit**:
    *   Click the **"Submit"** button.

Google will now schedule your sitemap for crawling. The status will initially show as "Couldn't fetch" or "Processing" and should change to **"Success"** within a few hours or days. Once processed, Google will use it to understand your site's structure and discover your pages.

---

### Next Steps

*   **Deploy the Code**: Make sure the `sitemap.xml` and `robots.txt` files are deployed to the root directory of your live website.
*   **Monitor Search Console**: Regularly check your Search Console dashboard for performance insights, indexing errors, and mobile usability issues.
