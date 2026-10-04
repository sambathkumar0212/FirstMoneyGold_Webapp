/**
 * FIRST MONEY GOLD (FMG) - Comprehensive Web App Logic
 * Features:
 * - Real-time Gold Loan & Sell Old Gold Calculation Engine
 * - Dynamic Category-Matched Prefilled WhatsApp Integration
 * - Interactive WhatsApp Category Modal
 * - English / Tamil Bilingual Language Switcher
 * - 10-Digit Clean Phone Sanitizer
 * - Multi-Branch Locator & Routing
 */

export const FMG_WHATSAPP_NUMBER = '916380630242';

export let currentLang = 'en';
export let calcMode = 'sell';
export let currentPurity = 22;
export let currentRate = 13675;

/**
 * Universal Phone Sanitizer: extracts clean 10-digit number even if +91, 91, 0, or spaces are provided
 */
export function cleanPhoneNumber(raw) {
    if (!raw) return '';
    let digits = String(raw).replace(/\D/g, '');
    if (digits.length === 14 && digits.startsWith('0091')) {
        digits = digits.slice(4);
    } else if (digits.length === 12 && digits.startsWith('91')) {
        digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
        digits = digits.slice(1);
    } else if (digits.length > 10) {
        if (digits.startsWith('91')) {
            digits = digits.slice(2);
        } else if (digits.startsWith('0')) {
            digits = digits.slice(1);
        }
        if (digits.length > 10) {
            digits = digits.slice(-10);
        }
    }
    return digits;
}

export function getPavanDescription(grams) {
    const pavans = grams / 8;
    if (pavans === 1) return '1 Pavan';
    if (Number.isInteger(pavans)) return `${pavans} Pavans`;
    return `${pavans.toFixed(1)} Pavans`;
}

/**
 * Category-Matched Prefilled WhatsApp Message Generator
 */
export function generateWhatsAppMessage(category, extra = {}) {
    const isTamil = (currentLang === 'ta');
    const weight = parseFloat(extra.weight || document.getElementById('gold-weight-input')?.value || 16);
    const purity = parseInt(extra.purity || currentPurity || 22);
    const purityLabel = purity === 24 ? '24 Karat (99.9% Pure)' : purity === 18 ? '18 Karat (75.0% Jewelry)' : '22 Karat (91.6% Hallmark)';
    const rate = extra.rate || currentRate || 13675;
    const marketVal = Math.round(weight * rate);
    const loanEstimate = Math.round(marketVal * 0.85);
    const sellEstimate = Math.round(marketVal * 0.98);
    const monthlyInterest = Math.round(loanEstimate * 0.0099);
    const pavanText = getPavanDescription(weight);

    const leadName = (extra.name || document.getElementById('lead-name')?.value || '').trim();
    const rawLeadPhone = extra.phone || document.getElementById('lead-phone')?.value || '';
    const leadPhone = cleanPhoneNumber(rawLeadPhone);
    const selectedCity = extra.city || document.getElementById('lead-city')?.value || 'Chennai (T. Nagar)';

    let msg = '';

    switch (category) {
        case 'loan': {
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - உடனடி தங்கக் கடன் முன்பதிவு* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* 💰 உடனடி தங்கக் கடன் (அதிகபட்ச மதிப்பு)\n` +
                      `• *தங்கத்தின் எடை:* ${weight} கிராம் (${pavanText})\n` +
                      `• *காரட் (Purity):* ${purityLabel}\n` +
                      `• *இன்றைய நேரலை விலை:* ₹${rate.toLocaleString('en-IN')}/கிராம்\n` +
                      `• *கையில் கிடைக்கும் கடன் தொகை:* ₹${loanEstimate.toLocaleString('en-IN')}\n` +
                      `• *மாத வட்டி (0.99% முதல்):* ₹${monthlyInterest.toLocaleString('en-IN')} / மாதம்\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      (leadName ? `• *வாடிக்கையாளர் பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, எனது தங்கத்திற்கு உடனடி கடன் பெற விரும்புகிறேன். 15 நிமிட பணப்பட்டுவாடா செயல்முறையைத் தொடங்கவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Instant Gold Loan Inquiry* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Category:* 💰 Instant Gold Loan (Highest LTV)\n` +
                      `• *Gold Weight:* ${weight}g (${pavanText})\n` +
                      `• *Purity:* ${purityLabel}\n` +
                      `• *Today's Live Rate:* ₹${rate.toLocaleString('en-IN')}/g\n` +
                      `• *Estimated Loan Cash:* ₹${loanEstimate.toLocaleString('en-IN')}\n` +
                      `• *Monthly Interest (from 0.99%):* ₹${monthlyInterest.toLocaleString('en-IN')} / month\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I calculated my gold loan estimate on your website and would like to proceed with instant loan disbursal. Please guide me.`;
            }
            break;
        }

        case 'sell': {
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - பழைய நகை நேரடி விற்பனை* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* 🏷️ பழைய நகை நேரடி விற்பனை (Instant Cash)\n` +
                      `• *தங்கத்தின் எடை:* ${weight} கிராம் (${pavanText})\n` +
                      `• *காரட் (Purity):* ${purityLabel}\n` +
                      `• *மதிப்பிடப்பட்ட உடனடி ரொக்கம்:* ₹${sellEstimate.toLocaleString('en-IN')} (98% சந்தை மதிப்பு)\n` +
                      `• *பரிசோதனை முறை:* ஜெர்மன் XRF சேதமில்லா சோதனை\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      (leadName ? `• *வாடிக்கையாளர் பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, எனது பழைய தங்க நகைகளை விற்று உடனடி ரொக்கம் பெற விரும்புகிறேன். அடுத்த கட்டத்தை பகிரவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Sell Old Gold for Cash* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Category:* 🏷️ Sell Old Gold for Instant Cash\n` +
                      `• *Gold Weight:* ${weight}g (${pavanText})\n` +
                      `• *Purity:* ${purityLabel}\n` +
                      `• *Estimated Direct Cash:* ₹${sellEstimate.toLocaleString('en-IN')} (98% Valuation)\n` +
                      `• *Testing Method:* German XRF Non-Destructive Scan\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I want to sell my old gold ornaments for instant cash/UPI payout. Please assist me.`;
            }
            break;
        }

        case 'release': {
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - அடகு நகைகள் நேரடி மீட்பு* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* 🔓 அடகு நகைகள் மீட்பு (Loan Takeover & Debt Clearance)\n` +
                      `• *சேவை விவரம்:* வங்கி / அடகு கடை நிலுவைத் தொகையை FMG நிதியில் செலுத்துதல் & கூடுதல் பணப் பட்டுவாடா\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      (leadName ? `• *வாடிக்கையாளர் பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      (extra.weight ? `• *தோராயமான எடை:* ${extra.weight}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, பிற வங்கியில் அடகு வைக்கப்பட்ட எனது நகைகளை உங்கள் நிதியைக் கொண்டு மீட்டுத் தந்து, கூடுதல் தொகையை வழங்க வழிகாட்டவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Release Pledged Gold Inquiry* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Category:* 🔓 Release Pledged Gold (Bank/Pawnshop Loan Takeover)\n` +
                      `• *Service Detail:* Clear pending debt with FMG funds & receive surplus cash / 0.99% fresh loan\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `• *Approx. Gold Weight:* ${extra.weight || `${weight}g (${pavanText})`}\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I have gold pledged with another bank/pawnshop. I want First Money Gold to clear the debt and release my ornaments. Please guide me immediately.`;
            }
            break;
        }

        case 'branch': {
            const branchName = extra.branch || 'Chennai (T. Nagar)';
            const branchLandmark = extra.landmark || 'Usman Road';
            const branchAddress = extra.address || 'No. 42, Usman Road, T. Nagar, Chennai - 600017';
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - கிளை வருகை & முன்பதிவு* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* 📍 நேரடிக் கிளை வருகை (Branch Visit & Valuation)\n` +
                      `• *கிளை:* ${branchName}\n` +
                      `• *அடையாளம்:* ${branchLandmark}\n` +
                      `• *முகவரி:* ${branchAddress}\n` +
                      `• *நேரம்:* திங்கள் - சனி: காலை 9:00 - மாலை 7:30\n` +
                      (leadName ? `• *வாடிக்கையாளர் பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் ${branchName} FMG குழுவினரே, நான் உங்கள் கிளைக்கு நேரில் வருகை தந்து நகைப் பரிசோதனை / கடன் பெற விரும்புகிறேன். தற்போதைய அலுவலக இருப்பிடத்தை பகிரவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Branch Visit Appointment* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Category:* 📍 Physical Branch Visit & In-Person Valuation\n` +
                      `• *Branch:* ${branchName}\n` +
                      `• *Landmark:* ${branchLandmark}\n` +
                      `• *Address:* ${branchAddress}\n` +
                      `• *Office Hours:* Mon - Sat: 9:00 AM – 7:30 PM\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello ${branchName} FMG team, I would like to visit your branch for gold appraisal / loan assistance. Please confirm your branch hours and location pin.`;
            }
            break;
        }

        case 'franchise': {
            const model = extra.model || 'Standard Franchise (₹5 Lakhs)';
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - கிளை உரிமை & கூட்டாண்மை* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* 🤝 வணிகக் கூட்டாண்மை (Franchise Partnership)\n` +
                      `• *முதலீட்டுத் திட்டம்:* ${model}\n` +
                      `• *வருமான வாய்ப்பு:* மாதம் ₹1 லட்சம் முதல் ₹10 லட்சம் வரை\n` +
                      (leadName ? `• *விண்ணப்பதாரர் பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      (selectedCity ? `• *விரும்பும் இடம்/நகரம்:* ${selectedCity}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold நிர்வாகமே, நான் FMG கிளை உரிமை (Franchise) தொடங்குவதில் ஆர்வமாக உள்ளேன். விரிவான திட்ட அறிக்கை மற்றும் ஆவணங்களை பகிரவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Franchise Partnership Inquiry* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Category:* 🤝 Franchise & Business Partnership\n` +
                      `• *Selected Setup Model:* ${model}\n` +
                      `• *Expected Monthly Earning:* ₹1 Lakh - ₹10 Lakhs\n` +
                      (leadName ? `• *Applicant Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      (selectedCity ? `• *Target City/Area:* ${selectedCity}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold Management, I am interested in opening a First Money Gold franchise branch. Please share the complete franchise prospectus, ROI model, and application procedure.`;
            }
            break;
        }

        case 'callback': {
            const chosenService = extra.service || document.getElementById('lead-service')?.value || 'Instant Gold Loan';
            const weightVal = extra.weight || document.getElementById('lead-weight')?.value || `${weight}g (${pavanText})`;
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - முன்பதிவு & ஆலோசனை* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவைத் தேர்வு:* ${chosenService}\n` +
                      `• *வாடிக்கையாளர் பெயர்:* ${leadName || 'மதிப்பிற்குரிய வாடிக்கையாளர்'}\n` +
                      `• *கைபேசி எண்:* ${leadPhone ? '+91 ' + leadPhone : 'நேரடி வாட்ஸ்அப்'}\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      `• *தங்கத்தின் எடை:* ${weightVal}\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, இணையதளத்தில் எனது விவரங்களை பதிவு செய்துள்ளேன். எனக்கு சிறந்த வட்டித் திட்டத்தை வழங்கி உதவவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Callback & Valuation Request* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Selected Service Category:* ${chosenService}\n` +
                      `• *Customer Name:* ${leadName || 'Valued Customer'}\n` +
                      `• *Mobile Number:* ${leadPhone ? '+91 ' + leadPhone : 'Direct WhatsApp'}\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      `• *Approx. Gold Weight:* ${weightVal}\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I have submitted my details on your website. Please connect with me for customized scheme and branch assistance.`;
            }
            break;
        }

        case 'pledge_profit': {
            const pWeight = extra.weight || 24;
            const pGross = extra.gross || Math.round(pWeight * currentRate * 0.98);
            const pDebt = extra.debt || 150000;
            const pProfit = extra.profit || Math.max(0, pGross - pDebt);
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - அடகு நகை மீட்பு & கூடுதல் ரொக்க லாபம்* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *தங்கத்தின் எடை:* ${pWeight} கிராம் (${getPavanDescription(pWeight)})\n` +
                      `• *இன்றைய 98% நேரலை மதிப்பு:* ₹${Number(pGross).toLocaleString('en-IN')}\n` +
                      `• *வங்கியில் உள்ள கடன் நிலுவை:* -₹${Number(pDebt).toLocaleString('en-IN')}\n` +
                      `• *🔥 கையில் கிடைக்கும் கூடுதல் பணம்:* ₹${Number(pProfit).toLocaleString('en-IN')}\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, பிற வங்கியில் உள்ள எனது அடகு நகையை உங்கள் பணத்தில் மீட்டு, மீதமுள்ள ₹${Number(pProfit).toLocaleString('en-IN')} கூடுதல் ரொக்கத்தைப் பெற விரும்புகிறேன். வழிகாட்டவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Pledged Gold Net Profit Clearance* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Gold Weight:* ${pWeight}g (${getPavanDescription(pWeight)})\n` +
                      `• *Current 98% Market Value:* ₹${Number(pGross).toLocaleString('en-IN')}\n` +
                      `• *Pending Bank Debt to Clear:* -₹${Number(pDebt).toLocaleString('en-IN')}\n` +
                      `• *🔥 Estimated Net Cash Surplus In Hand:* ₹${Number(pProfit).toLocaleString('en-IN')}\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I calculated my pledge release profit. I want FMG to clear my pending loan of ₹${Number(pDebt).toLocaleString('en-IN')} and hand me the surplus cash of ₹${Number(pProfit).toLocaleString('en-IN')}. Please guide me.`;
            }
            break;
        }

        case 'doorstep': {
            const dWeight = extra.weight || '5+ Pavans (40g+)';
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - விஐபி நேரடி இல்ல வருகை முன்பதிவு (Doorstep)* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவை:* 🚗 இல்லத்திற்கே வந்து ஜெர்மன் XRF மூலம் நகைப் பரிசோதனை & உடனடி பணம்\n` +
                      `• *தோராயமான எடை:* ${dWeight}\n` +
                      `• *இடம் / நகரம்:* ${selectedCity}\n` +
                      (leadName ? `• *பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, எனது இல்லத்திற்கே உங்கள் அதிகாரியை அனுப்பி ஜெர்மன் XRF மூலம் நகைகளை பரிசோதித்து உடனடி பணம் வழங்க முன்பதிவு செய்ய விரும்புகிறேன்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - VIP Doorstep Gold Appraisal Booking* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Service:* 🚗 Home Visit German XRF Gold Testing & Spot Bank Disbursal\n` +
                      `• *Approx. Gold Weight:* ${dWeight}\n` +
                      `• *Location / City:* ${selectedCity}\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold, I would like to schedule a VIP Doorstep Gold Evaluation at my home/office. Please confirm the available time slots and executive arrival.`;
            }
            break;
        }

        case 'referral': {
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - பரிந்துரை & வெகுமதி திட்டம் (Refer & Earn)* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் நண்பரே! பழைய தங்க நகைகளை விற்று 98% உடனடி ரொக்கப் பணம் பெற அல்லது குறைந்த 0.99% வட்டியில் தங்கக் கடன் பெற First Money Gold (FMG) நிறுவனத்தை பரிந்துரைக்கிறேன்.\n` +
                      `• 15 நிமிடங்களில் நேரடி ரொக்கம் / UPI\n` +
                      `• ஜெர்மன் XRF சேதமில்லா சோதனை\n` +
                      `• சென்னை, தேனி, திண்டுக்கல், வத்தலகுண்டு, நிலக்கோட்டை கிளைகள்\n` +
                      `இன்றைய நேரலை விலையை அறிந்து கொள்ள வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்: https://wa.me/${FMG_WHATSAPP_NUMBER}`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - High Cash Value Gold Buyers & Loans* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello! If you want to sell old gold for top 98% market valuation or get lowest interest gold loans (from 0.99%), I recommend First Money Gold (FMG).\n` +
                      `• 15-Minute Instant Cash / UPI Disbursal\n` +
                      `• German XRF Non-Destructive Scanning (0% damage)\n` +
                      `• Branches in Chennai, Theni, Dindigul, Batlagundu, and Nilakottai\n` +
                      `Check today's live rate and get instant quote here: https://wa.me/${FMG_WHATSAPP_NUMBER}`;
            }
            break;
        }

        default: {
            if (isTamil) {
                msg = `🌟 *FIRST MONEY GOLD - நேரடி வாடிக்கையாளர் உதவி* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *சேவை:* பொதுவான உதவி & தங்கக் கடன் ஆலோசனை\n` +
                      `• *விருப்பமான கிளை:* ${selectedCity}\n` +
                      (leadName ? `• *பெயர்:* ${leadName}\n` : '') +
                      (leadPhone ? `• *மொபைல் எண்:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `வணக்கம் First Money Gold, எனக்கு தங்கக் கடன் / அடகு மீட்பு தொடர்பான விவரங்கள் தேவை. உதவவும்.`;
            } else {
                msg = `🌟 *FIRST MONEY GOLD - Direct Customer Support* 🌟\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `• *Inquiry:* Gold Loan / Old Gold / Release Gold Consultation\n` +
                      `• *Preferred Branch:* ${selectedCity}\n` +
                      (leadName ? `• *Customer Name:* ${leadName}\n` : '') +
                      (leadPhone ? `• *Mobile Number:* +91 ${leadPhone}\n` : '') +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `Hello First Money Gold team, I would like to inquire about your gold financial services. Please guide me.`;
            }
            break;
        }
    }

    return msg;
}

export function openWhatsApp(category, extra = {}) {
    const text = generateWhatsAppMessage(category, extra);
    const url = `https://wa.me/${FMG_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

/**
 * WhatsApp Category Match Modal Handlers
 */
export function showWhatsAppModal() {
    const waModal = document.getElementById('wa-category-modal');
    if (!waModal) return;
    const weight = parseFloat(document.getElementById('gold-weight-input')?.value || 16);
    const marketVal = Math.round(weight * currentRate);
    const sellVal = Math.round(marketVal * 0.98);
    const loanVal = Math.round(marketVal * 0.85);
    const modalSellBadge = document.getElementById('modal-sell-badge');
    if (modalSellBadge) {
        modalSellBadge.textContent = `₹${sellVal.toLocaleString('en-IN')} (98% Cash)`;
    }
    const modalLoanBadge = document.getElementById('modal-loan-badge');
    if (modalLoanBadge) {
        modalLoanBadge.textContent = `₹${loanVal.toLocaleString('en-IN')} max loan`;
    }
    waModal.classList.remove('hidden');
    waModal.classList.add('flex');
}

export function hideWhatsAppModal() {
    const waModal = document.getElementById('wa-category-modal');
    if (!waModal) return;
    waModal.classList.add('hidden');
    waModal.classList.remove('flex');
}

/**
 * Setup Navigation, FAQ Search & Modals
 */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 20) {
            navbar.classList.add('glass', 'shadow-xl');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('glass', 'shadow-xl');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (menuIcon) menuIcon.classList.toggle('hidden');
            if (closeIcon) closeIcon.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        });
    });

    // FAQ Search Logic
    const faqSearch = document.getElementById('faq-search');
    const faqEmpty = document.getElementById('faq-empty');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll('.faq-item');
            let found = 0;

            items.forEach(item => {
                const question = (item.getAttribute('data-question') || '').toLowerCase();
                const answer = (item.querySelector('.faq-content p')?.innerText || '').toLowerCase();
                
                if (question.includes(term) || answer.includes(term)) {
                    item.style.display = 'block';
                    found++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (faqEmpty) {
                faqEmpty.style.display = (found === 0) ? 'block' : 'none';
            }
        });
    }
}

/**
 * Setup English / Tamil Bilingual Language Switcher
 */
function setupLanguageToggle() {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const currentLangText = document.getElementById('current-lang-text');

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = (lang === 'ta') ? el.getAttribute('data-ta') : el.getAttribute('data-en');
            if (text) el.innerHTML = text;
        });
        if (currentLangText) {
            currentLangText.textContent = (lang === 'ta') ? 'English' : 'தமிழ்';
        }
        if (typeof setCalculatorMode === 'function') {
            setCalculatorMode(calcMode);
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'ta' : 'en');
        });
    }
}

/**
 * Setup Lead Capture & Callback Form Handlers
 */
function setupLeadCaptureForm() {
    const leadForm = document.getElementById('lead-capture-form');
    const leadFeedback = document.getElementById('form-feedback');
    const leadWhatsappBtn = document.getElementById('lead-whatsapp-btn');
    const phoneInput = document.getElementById('lead-phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            const raw = phoneInput.value;
            if (/[^\d]/.test(raw) || raw.length > 10 || (raw.startsWith('0') && raw.length > 1) || (raw.startsWith('91') && raw.length > 10)) {
                phoneInput.value = cleanPhoneNumber(raw);
            }
        });

        phoneInput.addEventListener('paste', () => {
            setTimeout(() => {
                phoneInput.value = cleanPhoneNumber(phoneInput.value);
            }, 0);
        });

        phoneInput.addEventListener('blur', () => {
            phoneInput.value = cleanPhoneNumber(phoneInput.value);
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('lead-name')?.value.trim() || 'Customer';
            const rawPhone = document.getElementById('lead-phone')?.value || '';
            const phone = cleanPhoneNumber(rawPhone);
            const city = document.getElementById('lead-city')?.value || 'Chennai';
            const weight = document.getElementById('lead-weight')?.value.trim() || 'Not specified';
            const service = document.getElementById('lead-service')?.value || 'Instant Gold Loan';

            if (phone.length < 10) {
                alert(currentLang === 'ta' ? 'தயவுசெய்து சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.' : 'Please enter a valid 10-digit mobile number.');
                document.getElementById('lead-phone')?.focus();
                return;
            }

            if (phoneInput) {
                phoneInput.value = phone;
            }

            if (leadFeedback) {
                leadFeedback.classList.remove('hidden');
            }

            setTimeout(() => {
                openWhatsApp('callback', { name, phone, city, weight, service });
            }, 600);
        });
    }

    if (leadWhatsappBtn) {
        leadWhatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('lead-name')?.value.trim() || 'Valued Customer';
            const rawPhone = document.getElementById('lead-phone')?.value || '';
            const phone = cleanPhoneNumber(rawPhone);
            const city = document.getElementById('lead-city')?.value || 'Chennai';
            const weight = document.getElementById('lead-weight')?.value.trim() || '';
            const service = document.getElementById('lead-service')?.value || 'Instant Gold Loan';

            if (phone && phoneInput) {
                phoneInput.value = phone;
            }

            openWhatsApp('callback', { name, phone, city, weight, service });
        });
    }
}

/**
 * Setup Accordion Logic for FAQ items
 */
function setupFAQAccordion() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (!content) return;
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            document.querySelectorAll('.faq-content').forEach(c => {
                c.style.maxHeight = '0px';
                c.style.opacity = '0';
                const parentBtn = c.previousElementSibling;
                if (parentBtn) {
                    const icon = parentBtn.querySelector('.faq-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    const text = parentBtn.querySelector('span:first-child');
                    if (text) text.classList.remove('text-fmg-red');
                }
            });

            if (!isOpen) {
                content.style.maxHeight = '500px';
                content.style.opacity = '1';
                const icon = btn.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
                const text = btn.querySelector('span:first-child');
                if (text) text.classList.add('text-fmg-red');
            }
        });
    });
}

/**
 * Setup All WhatsApp Connection Points & Modal Triggers
 */
function setupWhatsAppIntegrations() {
    const closeWaModalBtn = document.getElementById('close-wa-modal-btn');
    const waModal = document.getElementById('wa-category-modal');

    if (closeWaModalBtn) {
        closeWaModalBtn.addEventListener('click', hideWhatsAppModal);
    }

    if (waModal) {
        waModal.addEventListener('click', (e) => {
            if (e.target === waModal) hideWhatsAppModal();
        });
    }

    document.querySelectorAll('.wa-category-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category') || 'general';
            hideWhatsAppModal();
            openWhatsApp(cat);
        });
    });

    const navWaIcon = document.getElementById('nav-wa-icon');
    const navGetStarted = document.getElementById('nav-get-started-btn');
    const heroWaBtn = document.getElementById('hero-wa-btn');
    const contactWaBtn = document.getElementById('contact-wa-btn');
    const mobileStickyWaBtn = document.getElementById('mobile-sticky-wa-btn');

    if (navWaIcon) navWaIcon.addEventListener('click', showWhatsAppModal);
    if (navGetStarted) navGetStarted.addEventListener('click', showWhatsAppModal);
    if (heroWaBtn) heroWaBtn.addEventListener('click', showWhatsAppModal);
    if (contactWaBtn) contactWaBtn.addEventListener('click', showWhatsAppModal);
    if (mobileStickyWaBtn) mobileStickyWaBtn.addEventListener('click', showWhatsAppModal);

    const releaseGoldWaBtn = document.getElementById('release-gold-wa-btn');
    if (releaseGoldWaBtn) {
        releaseGoldWaBtn.addEventListener('click', () => {
            openWhatsApp('release');
        });
    }

    document.querySelectorAll('.branch-wa-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const branch = btn.getAttribute('data-branch') || 'Chennai Branch';
            const landmark = btn.getAttribute('data-landmark') || '';
            const address = btn.getAttribute('data-address') || '';
            openWhatsApp('branch', { branch, landmark, address });
        });
    });

    document.querySelectorAll('.franchise-setup-card').forEach(card => {
        card.addEventListener('click', () => {
            const model = card.getAttribute('data-franchise-model') || 'Standard Franchise (₹5 Lakhs)';
            openWhatsApp('franchise', { model });
        });
    });

    const franchiseWaBtn = document.getElementById('franchise-wa-btn');
    if (franchiseWaBtn) {
        franchiseWaBtn.addEventListener('click', () => {
            openWhatsApp('franchise');
        });
    }
}

/**
 * Gold Loan & Cash Calculator Engine
 */
export function setCalculatorMode(mode) {
    calcMode = mode;
    const modeLoanBtn = document.getElementById('calc-mode-loan');
    const modeSellBtn = document.getElementById('calc-mode-sell');
    const resultTitle = document.getElementById('result-title');
    const outputLabel = document.getElementById('output-label');
    const calcLtvBadge = document.getElementById('calc-ltv-badge');
    const calcInterestRow = document.getElementById('calc-interest-row');
    const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');
    const calcLoanAmount = document.getElementById('calc-loan-amount');
    const calcMarketVal = document.getElementById('calc-market-val');
    const calcMonthlyInterest = document.getElementById('calc-monthly-interest');
    const weightInput = document.getElementById('gold-weight-input');

    if (mode === 'sell') {
        if (modeSellBtn) modeSellBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-fmg-red text-white shadow-md';
        if (modeLoanBtn) modeLoanBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-transparent text-slate-600 hover:text-black';
        if (resultTitle) resultTitle.innerText = (currentLang === 'ta') ? 'பழைய நகை நேரடி விற்பனை மதிப்பீடு' : 'Instant Old Gold Sell Estimate';
        if (outputLabel) outputLabel.innerText = (currentLang === 'ta') ? 'நேரடி ரொக்கப் பட்டுவாடா' : 'Direct Cash Payout (98% Valuation)';
        if (calcLtvBadge) {
            calcLtvBadge.innerText = (currentLang === 'ta') ? 'உயர்ந்த சந்தை விலை' : 'Top Market Rate Payout (98%)';
            calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full';
        }
        if (calcInterestRow) calcInterestRow.style.display = 'none';
        if (calcWhatsappBtn) {
            const btnText = calcWhatsappBtn.querySelector('span');
            if (btnText) btnText.innerText = (currentLang === 'ta') ? 'பழைய நகையை விற்று உடனடி பணம் பெற' : 'SELL THIS GOLD ON WHATSAPP';
        }
    } else {
        if (modeLoanBtn) modeLoanBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-fmg-red text-white shadow-md';
        if (modeSellBtn) modeSellBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-transparent text-slate-600 hover:text-black';
        if (resultTitle) resultTitle.innerText = (currentLang === 'ta') ? 'உடனடி தங்கக் கடன் மதிப்பீடு' : 'Instant Gold Loan Estimate';
        if (outputLabel) outputLabel.innerText = (currentLang === 'ta') ? 'கையில் கிடைக்கும் கடன் தொகை' : 'Max Loan Cash In Hand';
        if (calcLtvBadge) {
            calcLtvBadge.innerText = (currentLang === 'ta') ? 'சந்தை மதிப்பில் 85% - 90% வரை' : 'Up to 85% - 90% Market LTV';
            calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full';
        }
        if (calcInterestRow) calcInterestRow.style.display = 'flex';
        if (calcWhatsappBtn) {
            const btnText = calcWhatsappBtn.querySelector('span');
            if (btnText) btnText.innerText = (currentLang === 'ta') ? 'இந்தக் கடனை வாட்ஸ்அப்பில் பெற' : 'GET THIS LOAN ON WHATSAPP';
        }
    }

    const weight = parseFloat(weightInput?.value) || 0;
    const marketVal = weight * currentRate;
    const finalVal = (mode === 'sell') ? Math.round(marketVal * 0.98) : Math.round(marketVal * 0.85);
    const monthlyInterest = Math.round(finalVal * 0.0099);
    if (calcLoanAmount) calcLoanAmount.innerText = finalVal.toLocaleString('en-IN');
    if (calcMarketVal) calcMarketVal.innerText = '₹' + Math.round(marketVal).toLocaleString('en-IN');
    if (calcMonthlyInterest) calcMonthlyInterest.innerText = '₹' + monthlyInterest.toLocaleString('en-IN') + ' / month';
}

function setupGoldCalculator() {
    const modeLoanBtn = document.getElementById('calc-mode-loan');
    const modeSellBtn = document.getElementById('calc-mode-sell');
    const purityBtns = document.querySelectorAll('.purity-btn');
    const weightInput = document.getElementById('gold-weight-input');
    const weightSlider = document.getElementById('gold-weight-slider');
    const weightChips = document.querySelectorAll('.weight-chip');
    const rateBadge = document.getElementById('rate-badge');
    const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

    function calculateValues() {
        setCalculatorMode(calcMode);
    }

    if (calcWhatsappBtn) {
        calcWhatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(calcMode);
        });
    }

    if (modeLoanBtn) {
        modeLoanBtn.addEventListener('click', () => setCalculatorMode('loan'));
    }
    if (modeSellBtn) {
        modeSellBtn.addEventListener('click', () => setCalculatorMode('sell'));
    }

    document.querySelectorAll('.hero-sell-cta').forEach(btn => {
        btn.addEventListener('click', () => setCalculatorMode('sell'));
    });
    document.querySelectorAll('.hero-loan-cta').forEach(btn => {
        btn.addEventListener('click', () => setCalculatorMode('loan'));
    });

    purityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            purityBtns.forEach(b => {
                b.classList.remove('border-fmg-red', 'bg-red-50/50');
                b.classList.add('border-slate-200');
            });
            btn.classList.add('border-fmg-red', 'bg-red-50/50');
            btn.classList.remove('border-slate-200');
            
            currentPurity = parseInt(btn.getAttribute('data-purity')) || 22;
            currentRate = parseFloat(btn.getAttribute('data-rate')) || 13675;
            if (rateBadge) rateBadge.innerText = `Today: ₹${currentRate.toLocaleString('en-IN')} / gram`;
            calculateValues();
        });
    });

    if (weightInput && weightSlider) {
        weightInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) || 0;
            weightSlider.value = Math.min(val, 100);
            weightChips.forEach(chip => {
                if (parseFloat(chip.getAttribute('data-weight')) === val) {
                    chip.classList.add('bg-fmg-red', 'text-white');
                    chip.classList.remove('bg-slate-100', 'text-slate-700');
                } else {
                    chip.classList.remove('bg-fmg-red', 'text-white');
                    chip.classList.add('bg-slate-100', 'text-slate-700');
                }
            });
            calculateValues();
        });

        weightSlider.addEventListener('input', (e) => {
            weightInput.value = e.target.value;
            weightChips.forEach(chip => {
                if (parseFloat(chip.getAttribute('data-weight')) === parseFloat(e.target.value)) {
                    chip.classList.add('bg-fmg-red', 'text-white');
                    chip.classList.remove('bg-slate-100', 'text-slate-700');
                } else {
                    chip.classList.remove('bg-fmg-red', 'text-white');
                    chip.classList.add('bg-slate-100', 'text-slate-700');
                }
            });
            calculateValues();
        });
    }

    weightChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = parseFloat(chip.getAttribute('data-weight')) || 8;
            if (weightInput) weightInput.value = val;
            if (weightSlider) weightSlider.value = Math.min(val, 100);
            weightChips.forEach(c => {
                c.classList.remove('bg-fmg-red', 'text-white');
                c.classList.add('bg-slate-100', 'text-slate-700');
            });
            chip.classList.add('bg-fmg-red', 'text-white');
            chip.classList.remove('bg-slate-100', 'text-slate-700');
            calculateValues();
        });
    });

    calculateValues();
}

/**
 * Pledged Gold Release Net Profit Calculator
 */
export function setupPledgeReleaseCalculator() {
    const weightInput = document.getElementById('pledge-calc-weight');
    const debtInput = document.getElementById('pledge-calc-debt');
    const grossValEl = document.getElementById('pledge-calc-gross');
    const debtValEl = document.getElementById('pledge-calc-debt-display');
    const netProfitEl = document.getElementById('pledge-calc-net-profit');
    const whatsappBtn = document.getElementById('pledge-calc-wa-btn');
    const weightChips = document.querySelectorAll('.pledge-weight-chip');

    function calculatePledgeProfit() {
        const weight = parseFloat(weightInput?.value) || 24;
        const debt = parseFloat(debtInput?.value) || 0;
        const grossValue = Math.round(weight * currentRate * 0.98);
        const netProfit = Math.max(0, grossValue - debt);

        if (grossValEl) grossValEl.textContent = '₹' + grossValue.toLocaleString('en-IN');
        if (debtValEl) debtValEl.textContent = '- ₹' + Math.round(debt).toLocaleString('en-IN');
        if (netProfitEl) netProfitEl.textContent = '₹' + netProfit.toLocaleString('en-IN');
        if (whatsappBtn) {
            const btnSpan = whatsappBtn.querySelector('.pledge-wa-text');
            if (btnSpan) {
                btnSpan.textContent = (currentLang === 'ta') 
                    ? `₹${netProfit.toLocaleString('en-IN')} கூடுதல் பணத்தை வாட்ஸ்அப்பில் பெற` 
                    : `CLAIM ₹${netProfit.toLocaleString('en-IN')} SURPLUS CASH ON WHATSAPP`;
            }
        }
    }

    if (weightInput) weightInput.addEventListener('input', calculatePledgeProfit);
    if (debtInput) debtInput.addEventListener('input', calculatePledgeProfit);

    weightChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const w = parseFloat(chip.getAttribute('data-weight')) || 24;
            if (weightInput) weightInput.value = w;
            weightChips.forEach(c => {
                c.classList.remove('bg-fmg-red', 'text-white');
                c.classList.add('bg-slate-100', 'text-slate-700');
            });
            chip.classList.add('bg-fmg-red', 'text-white');
            chip.classList.remove('bg-slate-100', 'text-slate-700');
            calculatePledgeProfit();
        });
    });

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const weight = parseFloat(weightInput?.value) || 24;
            const debt = parseFloat(debtInput?.value) || 0;
            const gross = Math.round(weight * currentRate * 0.98);
            const profit = Math.max(0, gross - debt);
            openWhatsApp('pledge_profit', { weight, gross, debt, profit });
        });
    }

    calculatePledgeProfit();
}

/**
 * VIP Doorstep Service & Referral Cashback Program Handlers
 */
export function setupDoorstepAndReferral() {
    const doorstepBtn = document.getElementById('doorstep-book-btn');
    const referralShareBtn = document.getElementById('referral-share-btn');
    const referralCopyBtn = document.getElementById('referral-copy-btn');

    if (doorstepBtn) {
        doorstepBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const weight = document.getElementById('doorstep-weight')?.value || '5+ Pavans (40g+)';
            const city = document.getElementById('doorstep-city')?.value || 'Chennai';
            openWhatsApp('doorstep', { weight, city });
        });
    }

    if (referralShareBtn) {
        referralShareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp('referral');
        });
    }

    if (referralCopyBtn) {
        referralCopyBtn.addEventListener('click', () => {
            const text = generateWhatsAppMessage('referral');
            navigator.clipboard.writeText(text).then(() => {
                referralCopyBtn.textContent = (currentLang === 'ta') ? '✅ நகலெடுக்கப்பட்டது!' : '✅ Message Copied!';
                setTimeout(() => {
                    referralCopyBtn.textContent = (currentLang === 'ta') ? '📋 தகவலை நகலெடு' : '📋 Copy Share Message';
                }, 2500);
            }).catch(() => {
                openWhatsApp('referral');
            });
        });
    }
}

export function init() {
    setupNavigation();
    setupLanguageToggle();
    setupLeadCaptureForm();
    setupFAQAccordion();
    setupWhatsAppIntegrations();
    setupGoldCalculator();
    setupPledgeReleaseCalculator();
    setupDoorstepAndReferral();
}

// Auto-run if DOM ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}