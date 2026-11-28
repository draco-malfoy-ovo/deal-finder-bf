# Sources — where every price was read

All prices were read on **Friday, November 27, 2026, in the afternoon (China
Standard Time)**, via web search results that reproduce the stores' own
pages, cross-checked against deals coverage. "Usual price" is the regular or
comparable price printed on the same store page. Sale windows are the
stores' published Black Friday windows: Best Buy Nov 19–28, Walmart Nov
23–29, Target Nov 22–29 (all 2026).

The hand-in program (main.ts) preflights every listed deal before writing
its output: product, store, sale price, usual price, store link, source and
— since the November 28 recheck below — an evidence link must all be
present, and the screenshots and app/ files must sit inside the
competition's caps, or the run exits nonzero and hands nothing in.

## Recheck — Saturday, November 28, 2026

On the morning of Saturday, November 28, 2026 (CST), every listed price was
read again — the store's own page as search reproduces it, cross-checked
against dated deals coverage. Result: **12 checked, 12 unchanged, 0
repriced, 0 ended.** Every deal was still inside its published sale window
(Best Buy's ends today, Nov 28; Walmart's and Target's run to Nov 29; the
Switch 2 bundle runs to Dec 5), so no card was edited, repriced or marked
ended, and the check label on every card now shows both dates.

Each card also gained an evidence link — dated, independent coverage of the
same price, so a reviewer can see the price as it stood at check time:

1. Hisense 98" QD5 — Slickdeals frontpage thread, $800 / $2,500: https://slickdeals.net/sh/thread-20338530/e/3/c/deal-details/au/93975838e81311f1a34eae5f1dc1cb90/
2. Shark PowerDetect Speed — Best Buy's own Black Friday press release, "Save $300 on Shark PowerDetect Speed… (Sale price: $199.99)": https://corporate.bestbuy.com/2026/black-friday-sale-deals
3. LG 55" B6E OLED — AppleInsider, "Black Friday OLED TV deals start at $699": https://appleinsider.com/articles/26/11/21/black-friday-oled-tv-deals-start-at-699-with-up-to-1400-off-lg-sony-samsung
4. Sony WH-1000XM5 — HotHardware, "WH-1000XM5 all-time low" ($169.99, save $228.01): https://hothardware.com/news/best-buy-doorbuster-deals-slash-sony-wh-1000xm5-all-time-low
5. Beats Studio Pro — DealNews product page, "$99… $40 less than Best Buy or Target, best price we've seen": https://www.dealnews.com/products/Beats/Beats-Studio-Pro-Wireless-Noise-Cancelling-Over-Ear-Headphones/562849.html
6. TCL 65" S4CF — DealNews' Best Buy Black Friday TV roundup ("$240 off at $229.99… deals end November 28"): https://www.dealnews.com/Best-Buy-Black-Friday-TV-Deals-Up-to-68-off-free-shipping/22415314.html
7. Beats Solo 4 — Clark Deals' Target Black Friday roundup ("Bright Pink for $79.99 — Save $120 on this color exclusive to Target"): https://clarkdeals.com/black-friday/target-black-friday-ad/
8. HP OmniBook 5 14" — DealNews product page ("drops to $449.99… $50 less than you'd pay direct from HP"): https://www.dealnews.com/products/HP/HP-Omni-Book-5-Core-5-14-OLED-Laptop/563316.html
9. Hisense 65" H5R1 — DealNews product page ($228, verified): https://www.dealnews.com/products/Hisense/Hisense-H5-R1-Series-65-H5-R1-65-4-K-UHD-Smart-Roku-TV/564392.html
10. AirPods Pro 3 — Slickdeals thread for the Target offer ($149.99, reg. $249.99), and Target's own search page still showed $149.99 on the morning of the recheck: https://slickdeals.net/sh/thread-20377815/e/3/c/deal-details/au/af651be4e77e11f1a6a09668644b317b/
11. Keurig K-Express Essentials — Slickdeals thread ("$35 / $59 at Walmart", Bluebell among the colors): https://slickdeals.net/sh/thread-20373591/e/3/c/deal-details/au/933a6df6ea3611f1919eae6129e59410/
12. Switch 2 bundle — The Shortcut's Black Friday check (Nov 27, 6:50pm ET): bundle $499, "the same as the console alone ($499.99)": https://www.theshortcut.com/p/switch-2-restock-black-friday-2026

All discounts and scores were recomputed with the site's single formula —
discount % = round((1 − price ÷ usual) × 100); savings bonus = min(30,
round(savings ÷ 50)); verdict bonus 20 / 10 / 0; total capped at 99 — and
the board's totals re-added: the twelve cards' savings sum to $4,182.01,
matching the $4,182 headline figure on the site.

One gap was rechecked and deliberately left as it was: AirPods Pro 3 at
Amazon. CNN Underscored and DealNews both confirm Amazon's $149 (an
all-time low, down from $249), but no amazon.com product URL could be
obtained, so under this board's own rule no Amazon card was added; the
Target card's linkless "also at Amazon $149.00" note stands, now
re-verified. No new deals were added in this pass — nothing else was
listed without a store product link that opens the product at the printed
price, and the board does not pad.

## Listed deals

1. **Hisense 98" QD5 Hi-QLED 4K Fire TV (98QD5SF) — Best Buy $799.99, comp. value $2,499.99.**
   Best Buy's product page shows "Doorbuster $799.99, Save $1,700, Comp. Value $2,499.99",
   sold by Best Buy, model 98QD5SF. Corroborated by Slickdeals (frontpage, $800 / $2,500,
   free shipping) and DealNews' Best Buy TV roundup ("drops to $799.99, a massive 68% discount;
   deals end November 28").
2. **Shark PowerDetect Speed Cordless Vacuum (IA1121) — Best Buy $199.99, comp. value $499.99.**
   Best Buy product page: "Black Friday Deal $199.99, Save $300, Comp. Value $499.99".
   Also named in Best Buy's own Black Friday press release (Nov 17, 2026):
   "Save $300 on Shark PowerDetect Speed Cordless Stick Vacuum Cleaner (Sale price: $199.99)".
   The 60-minute runtime caveat is from Best Buy's specifications as reported in deal coverage.
3. **LG 55" B6E OLED AI 4K TV (OLED55B6EUA) — Best Buy $699.99, comp. value $1,399.99.**
   Best Buy product page shows $699.99 with "Save $700". Corroborated by AppleInsider
   ("dropped to $699.99 at Best Buy, a massive $700 discount") and The Gadgeteer
   ("cheapest way into a current-year OLED… undercuts every rival by at least $300").
4. **Sony WH-1000XM5 — Best Buy $169.99, comp. value $398.00.**
   Best Buy product page (Black, SKU 6505727): "$169.99, Save $228.01, Comp. Value $398.00",
   doorbuster through Nov 28; the blue variant's page is the one linked (same price, all
   four colors per HotHardware). "All-time low" per HotHardware, How-To Geek and Digital Trends.
5. **Beats Studio Pro — Walmart $99.00, was $299.00.**
   Walmart's product page variant table: Matte White and White & Black $99.00; other colors
   $149.95–$199.95. DealNews: "$40 less than Best Buy or Target… best price we've seen",
   Walmart Black Friday sale ending Nov 29.
6. **TCL 65" S4CF 4K Fire TV (65S4CF) — Best Buy $229.99, comp. value $469.99.**
   Best Buy product page (SKU 6687112): "$229.99, Save $240", doorbuster; DealNews lists it
   among Best Buy's doorbusters in the sale ending Nov 28.
7. **Beats Solo 4 — Target $79.99, reg. $199.99.**
   Target's Black Friday Beats page lists "Beats Solo 4 Bluetooth Wireless On-Ear Headphones:
   79.99 USD" (range $79.99–$99.99). Corroborated by Clark Deals ("Bright Pink for $79.99…
   Save $120 on this color exclusive to Target"), DansDeals ($79.99, reg. $199.99) and
   The Verge's early-deals coverage ("down to $79.99 at Target in pink and white… a new low
   price; other colors are $20 more"). The site link is Target's Black Friday Beats page —
   the page whose own structured data carries this product and price.
8. **HP OmniBook 5 14" 2K OLED Touch — Best Buy $449.99, was $799.99.**
   Best Buy's Black Friday release lists the OmniBook 5 14" at $449.99 ($350 off);
   DealNews shows the same $450 / $800 and notes it is "$50 less than HP" direct.
9. **Hisense 65" H5R1 4K Roku TV (65H5R1) — Walmart $228.00, was $398.00.**
   Walmart product page (free shipping); DealNews' Walmart TV roundup: "Hisense 65" H5R1
   4K Roku TV for $228, verified 47 mins ago", in the Walmart sale ending Nov 28/29.
10. **Apple AirPods Pro 3 — Target $149.99, reg. $249.99.**
    Target's product page (crawled the same day) shows $149.99 against $249.99; Slickdeals'
    frontpage agrees. Amazon's step down to $149 on Nov 23, 2026 is reported by 9to5Mac
    ("deals: AirPods Pro 3 hit $149 Amazon low") and AppleInsider — listed on the card as an
    "also at" price, with no Amazon link, because no Amazon product URL was returned by search.
11. **Keurig K-Express Essentials (Bluebell) — Walmart $35.00, was $59.00.**
    Walmart's product page: "Now $35.00, You save $24.00, was $59.00" for Bluebell; other
    colors show was-prices of $54.97–$76.80 at the same $35. Slickdeals frontpage confirms
    $35 / $59 with free shipping at Walmart. Walmart-exclusive model.
12. **Nintendo Switch 2 + Mario Kart World Bundle — Best Buy $499.99, save $50.**
    Best Buy product page (SKU 6689812): $499.99, "Save $50", on sale Nov 22 – Dec 5.
    The Verge's Black Friday guide reports the same $499.99 at Amazon, Walmart, Target and
    Nintendo, and explains the context printed on the card: the cut only returns the bundle
    to its pre-September-2026-rise price, and the console alone costs the same $499.99.

## Added Sat Nov 28, 2026 (round 2)

The twelve deals above were not edited in this round: their prices, store
links and evidence stand exactly as rechecked on the morning of Nov 28. Two
deals checked that afternoon were added; their cards carry a single
"checked Sat Nov 28, 2026" line and no recheck line.

13. **Apple AirPods Pro 3 — Amazon $149.00, reg. $249.99.**
    Amazon product page: https://www.amazon.com/dp/B0FQFB8FMG — the direct
    product link that search had not returned on Nov 27 (see deal 10) was
    obtained on Nov 28. MacRumors' Black Friday AirPods roundup (updated
    Nov 27, read Nov 28): "The AirPods Pro 3 are available for $149.00,
    down from $249.00"; CNN Underscored's Nov 28 roundup and 9to5Mac show
    the same $149 at Amazon. MacRumors (Nov 23) records the previous
    tracked low as $169, so $149 is an all-time low, $20 under it. The
    Target card (deal 10) is unchanged; the Amazon card cross-references
    its $149.99 and is cross-referenced back only here, not on that card.
14. **Instant Pot 5.7Qt VORTEX 4-in-1 Air Fryer — Walmart $54.99, was $84.99.**
    Walmart's product page reads "Now $54.99, You save $30.00, was $84.99";
    the same page showed $59.99 earlier in the sale, so the price stepped
    down inside the event. An independent price overview (FashLyst, dated
    Nov 28, 2026) lists the item at $54.99 at Walmart the same day.

Board totals after this round: 14 deals, 4 stores, total savings
$4,182.01 + $100.00 + $30.00 = $4,312.01 (the site prints $4,312);
verdicts 11 Verified low / 2 Real, with a catch / 1 Mostly marketing.

## Checked and left out (also on the site)

- **Ninja Kitchen System with BlendSense (TB401), Amazon $179.95 "28% off $249.99".**
  pricehistory.app's record for this exact product at amazon.com: $179.95 on Nov 10, 2026
  and Oct 4, 2026, three-month average $215.95–$224.92, lowest ever $146.99. A price
  tracker (beastcompare.com) likewise notes it "only matches its three-month low".
  Not a Black Friday low. Left out; no store link was taken for it.
- **Kindle Paperwhite (2024), Amazon $129.99 "35% off $199.99".**
  MacObserver and TechTimes (both Nov 2026): the $199.99 list price belongs to the new
  2026 Paperwhite; Amazon raised the 2024 model's list from $159.99 to $199.99 in August
  2026 (Fortune). Real saving ≈ $30. Left out of the board; the story is told on the site.
- **Amazon device list prices generally.** Tom's Guide, relayed by techresearchonline
  (Nov 27, 2026): Amazon raised list prices on some Echo, Fire TV and Kindle devices
  earlier in 2026, inflating the headline discounts measured against them.

## Candidates dropped for lack of a verifiable store link

Prices were seen in roundups for the LG 65" C6 OLED, Samsung 65" S90H OLED, Kindle
Paperwhite, Fire TV Stick 4K Plus, MacBook Air 13" (M5) and others, but no store
product URL was returned by search for them, so they were not listed: a deal whose
link cannot be opened and checked is not a deal this board will print.
