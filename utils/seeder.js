const Account = require('../models/Account');
const Student = require('../models/Student');
const Servant = require('../models/Servant');
const Hymn = require('../models/Hymn');
const Event = require('../models/Event');
const Finance = require('../models/Finance');
const Announcement = require('../models/Announcement');
const Attendance = require('../models/Attendance');

const seedData = async () => {
    try {
        console.log('🌱 جاري فحص وبذر البيانات الكنسية المعتمدة في MongoDB...');

        // 1. الحسابات
        const accountCount = await Account.countDocuments();
        if (accountCount === 0) {
            await Account.insertMany([
                { code: 'ADM-1', name: 'أ. مينا صموئيل', username: 'admin', password: '123', role: 'admin', year: 'مدير النظام وأمين الخدمة', active: true },
                { code: 'SRV-1', name: 'أ. فادي جرجس', username: 'servant', password: '123', role: 'servant', year: 'خادم أولى إعدادي ومعلم ألحان', active: true },
                { code: 'SRV-2', name: 'د. أندرو عماد', username: 'servant2', password: '123', role: 'servant', year: 'أمين الصندوق ومسؤول الطقس', active: true },
                { code: 'ST-101', name: 'مينا أمير شفيق', username: 'mina', password: '123', role: 'student', year: 'أولى إعدادي', active: true },
                { code: 'ST-102', name: 'كيرلس جرجس', username: 'kyrollos', password: '123', role: 'student', year: 'ثانية إعدادي', active: true },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', username: 'bishoy', password: '123', role: 'student', year: 'ثالثة إعدادي', active: true },
                { code: 'ST-104', name: 'مارك سمير عازر', username: 'mark', password: '123', role: 'student', year: 'أولى إعدادي', active: true }
            ]);
            console.log('✅ تم بذر الحسابات الرسمية');
        }

        // 2. المخدومين
        const studentCount = await Student.countDocuments();
        if (studentCount === 0) {
            await Student.insertMany([
                { code: 'ST-101', name: 'مينا أمير شفيق', year: 'أولى إعدادي', phone: '01011223344', parentPhone: '01222334455', confessionFather: 'أبونا مكسيموس', address: 'شارع المحطة', points: 420, stars: 15, badge: 'وسام حارس الألحان 🎼', attendanceRate: '95%', hymnsLevel: 'ممتاز' },
                { code: 'ST-102', name: 'كيرلس جرجس', year: 'ثانية إعدادي', phone: '01099887766', parentPhone: '01122334466', confessionFather: 'أبونا أنطونيوس', address: 'ميدان الكنيسة', points: 350, stars: 12, badge: 'شماس متميز 🌟', attendanceRate: '92%', hymnsLevel: 'جيد جداً مرتفع' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', year: 'ثالثة إعدادي', phone: '01288776655', parentPhone: '01033445566', confessionFather: 'أبونا بولا', address: 'برج السلام', points: 480, stars: 18, badge: 'بطل المواظبة 🏆', attendanceRate: '98%', hymnsLevel: 'ممتاز مع مرتبة الشرف' },
                { code: 'ST-104', name: 'مارك سمير عازر', year: 'أولى إعدادي', phone: '01155443322', parentPhone: '01299887711', confessionFather: 'أبونا مكسيموس', address: 'حي النور', points: 290, stars: 9, badge: 'شماس واعد ⭐', attendanceRate: '85%', hymnsLevel: 'جيد جداً' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', year: 'ثانية إعدادي', phone: '01066554433', parentPhone: '01211223377', confessionFather: 'أبونا داود', address: 'شارع الجمهورية', points: 380, stars: 14, badge: 'خادم المذبح ✝️', attendanceRate: '90%', hymnsLevel: 'ممتاز' },
                { code: 'ST-106', name: 'توماس سامح لويس', year: 'ثالثة إعدادي', phone: '01277665544', parentPhone: '01188776633', confessionFather: 'أبونا بولا', address: 'شارع الجلاء', points: 310, stars: 10, badge: 'شماس ملتزم ✨', attendanceRate: '88%', hymnsLevel: 'جيد جداً' }
            ]);
            console.log('✅ تم بذر سجل مخدومي إعدادي');
        }

        // 3. الخدام
        const servantCount = await Servant.countDocuments();
        if (servantCount === 0) {
            await Servant.insertMany([
                { name: 'أ. مينا صموئيل', role: 'أمين الخدمة العام ومدير النظام', stage: 'الإشراف العام', phone: '01000000001', duties: 'التنسيق العام مع الآباء الكهنة وإدارة الجداول والأنشطة' },
                { name: 'أ. فادي جرجس', role: 'خادم مرحلة أولى إعدادي ومعلم الألحان', stage: 'أولى إعدادي', phone: '01000000002', duties: 'تدريس ألحان القداس ومتابعة حضور الأولاد وتسميع النغمات' },
                { name: 'د. أندرو عماد', role: 'أمين صندوق الخدمة ومسؤول الطقس', stage: 'ثانية إعدادي', phone: '01000000003', duties: 'إدارة الخزينة والماليات وشرح طقوس الكنيسة القبطية' },
                { name: 'أ. مايكل عاطف', role: 'خادم مرحلة ثالثة إعدادي ومسؤول الافتقاد', stage: 'ثالثة إعدادي', phone: '01000000004', duties: 'افتقاد الغائبين والتواصل مع أولياء الأمور والرحلات' }
            ]);
            console.log('✅ تم بذر سجل الخدام');
        }

        // 4. الألحان
        const hymnCount = await Hymn.countDocuments();
        if (hymnCount === 0) {
            await Hymn.insertMany([
                {
                    hymnId: 'ep-ouro',
                    title: 'لحن إبؤرو (Ⲡ̀ⲟⲩⲣⲟ) - يا ملك السلام',
                    season: 'سنوي وطقسي',
                    grade: 'أولى إعدادي',
                    audioUrl: 'https://media.copticchurch.net/hymns/Ep-ouro.mp3',
                    verses: [
                        { coptic: 'Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ:', arabized: 'إبؤرو إنتي تي هيريني:', arabic: 'يا ملك السلام:' },
                        { coptic: 'ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ:', arabized: 'موي نان إنتي كيهيريني:', arabic: 'أعطنا سلامك:' },
                        { coptic: 'ⲥⲉⲙⲛⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ:', arabized: 'سيم ني نان إنتي كيهيريني:', arabic: 'قرر لنا سلامك:' },
                        { coptic: 'ⲭⲱ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲉⲛⲛⲟⲃⲓ.', arabized: 'كو نان إيفول إن نين نوفي.', arabic: 'واغفر لنا خطايانا.' }
                    ]
                },
                {
                    hymnId: 'hiten',
                    title: 'لحن هيتين ني إفشي (Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ) - الهيتنيات',
                    season: 'طقس القداس الإلهي',
                    grade: 'ثانية إعدادي',
                    audioUrl: 'https://media.copticchurch.net/hymns/Hiten.mp3',
                    verses: [
                        { coptic: 'Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ:', arabized: 'هيتين ني إفشي إنتي تي ثيؤطوكوس إثؤواب ماريا:', arabic: 'بصلوات وشفاعات والدة الإله القديسة مريم:' },
                        { coptic: 'Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.', arabized: 'إبشويس أري إهموت نان إمبي كو إيفول إنتي نين نوفي.', arabic: 'يا رب أنعم لنا بمغفرة خطايانا.' }
                    ]
                },
                {
                    hymnId: 'agios',
                    title: 'لحن قدوس الله (Ⲁ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ) - أجيوس الثلاثة تقديسات',
                    season: 'سنوي وطقس القداس',
                    grade: 'ثالثة إعدادي',
                    audioUrl: 'https://media.copticchurch.net/hymns/Agios.mp3',
                    verses: [
                        { coptic: 'Ⲁ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: ⲁ̀ⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ:', arabized: 'أجيوس أو ثيئوس، أجيوس إسشيروس، أجيوس أثاناتوس:', arabic: 'قدوس الله، قدوس القوي، قدوس الحي الذي لا يموت:' },
                        { coptic: 'ⲟ̀ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲏⲑⲓⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.', arabized: 'أو إك بارثينو جينيثيس، إليسون إيماس.', arabic: 'الذي ولد من العذراء، ارحمنا.' }
                    ]
                }
            ]);
            console.log('✅ تم بذر مكتبة الألحان الناطقة');
        }

        // 5. سجل الحضور متعدد الأسابيع
        const attendanceCount = await Attendance.countDocuments();
        if (attendanceCount === 0) {
            await Attendance.insertMany([
                // الأسبوع الحالي (W42: 11 - 17 أكتوبر 2026)
                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '06:12 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '06:15 م', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '06:05 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '-', status: 'غائب ❌' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '06:20 م', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'حصة الألحان الأسبوعية', date: '2026-10-16', time: '06:00 م', status: 'إذن 📝' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'القداس الإلهي', date: '2026-10-16', time: '07:15 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'القداس الإلهي', date: '2026-10-16', time: '07:20 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'القداس الإلهي', date: '2026-10-16', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'القداس الإلهي', date: '2026-10-16', time: '07:30 ص', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'القداس الإلهي', date: '2026-10-16', time: '07:10 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'القداس الإلهي', date: '2026-10-16', time: '07:25 ص', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '09:10 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '09:15 م', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '09:05 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '-', status: 'غائب ❌' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '09:20 م', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'تسبحة نصف الليل', date: '2026-10-17', time: '09:12 م', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'قداس الأحد', date: '2026-10-11', time: '07:10 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'قداس الأحد', date: '2026-10-11', time: '07:15 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'قداس الأحد', date: '2026-10-11', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'قداس الأحد', date: '2026-10-11', time: '07:20 ص', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'قداس الأحد', date: '2026-10-11', time: '07:30 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'قداس الأحد', date: '2026-10-11', time: '07:12 ص', status: 'حاضر ✅' },

                // أسبوع سابق (W41: 4 - 10 أكتوبر 2026)
                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:10 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:14 م', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:05 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:25 م', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:18 م', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'حصة الألحان الأسبوعية', date: '2026-10-09', time: '06:11 م', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'القداس الإلهي', date: '2026-10-09', time: '07:12 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'القداس الإلهي', date: '2026-10-09', time: '07:16 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'القداس الإلهي', date: '2026-10-09', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'القداس الإلهي', date: '2026-10-09', time: '07:00 ص', status: 'إذن 📝' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'القداس الإلهي', date: '2026-10-09', time: '07:15 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'القداس الإلهي', date: '2026-10-09', time: '07:20 ص', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '09:08 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '09:12 م', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '09:02 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '-', status: 'غائب ❌' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '09:00 م', status: 'إذن 📝' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'تسبحة نصف الليل', date: '2026-10-10', time: '09:15 م', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'قداس الأحد', date: '2026-10-04', time: '07:10 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'قداس الأحد', date: '2026-10-04', time: '07:18 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'قداس الأحد', date: '2026-10-04', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'قداس الأحد', date: '2026-10-04', time: '07:22 ص', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'قداس الأحد', date: '2026-10-04', time: '07:14 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'قداس الأحد', date: '2026-10-04', time: '07:10 ص', status: 'حاضر ✅' },

                // أسبوع بداية الشهر (W40: 27 سبتمبر - 3 أكتوبر 2026)
                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:12 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:15 م', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:05 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:20 م', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:16 م', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'حصة الألحان الأسبوعية', date: '2026-10-02', time: '06:00 م', status: 'إذن 📝' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'القداس الإلهي', date: '2026-10-02', time: '07:15 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'القداس الإلهي', date: '2026-10-02', time: '07:20 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'القداس الإلهي', date: '2026-10-02', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'القداس الإلهي', date: '2026-10-02', time: '07:22 ص', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'القداس الإلهي', date: '2026-10-02', time: '07:11 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'القداس الإلهي', date: '2026-10-02', time: '07:18 ص', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '09:10 م', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '09:00 م', status: 'إذن 📝' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '09:05 م', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '-', status: 'غائب ❌' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '09:18 م', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'تسبحة نصف الليل', date: '2026-10-03', time: '09:12 م', status: 'حاضر ✅' },

                { code: 'ST-101', name: 'مينا أمير شفيق', session: 'قداس الأحد', date: '2026-09-27', time: '07:10 ص', status: 'حاضر ✅' },
                { code: 'ST-102', name: 'كيرلس جرجس', session: 'قداس الأحد', date: '2026-09-27', time: '07:15 ص', status: 'حاضر ✅' },
                { code: 'ST-103', name: 'بيشوي رفيق فايز', session: 'قداس الأحد', date: '2026-09-27', time: '07:05 ص', status: 'حاضر ✅' },
                { code: 'ST-104', name: 'مارك سمير عازر', session: 'قداس الأحد', date: '2026-09-27', time: '07:20 ص', status: 'حاضر ✅' },
                { code: 'ST-105', name: 'ديفيد عادل فريد', session: 'قداس الأحد', date: '2026-09-27', time: '07:28 ص', status: 'حاضر ✅' },
                { code: 'ST-106', name: 'توماس سامح لويس', session: 'قداس الأحد', date: '2026-09-27', time: '07:14 ص', status: 'حاضر ✅' }
            ]);
            console.log('✅ تم بذر سجل الحضور والغياب التاريخي لعدة أسابيع');
        }

        // 6. المواعيد والأنشطة
        const eventCount = await Event.countDocuments();
        if (eventCount === 0) {
            await Event.insertMany([
                { eventId: 'ev-1', type: 'حصة', title: 'حصة الشهيد أبانوب للألحان والطقس', date: 'الجمعة القادم', time: '06:00 م', place: 'قاعة إعدادي - الدور الثاني', targetTimestamp: Date.now() + 86400000 * 2 },
                { eventId: 'ev-2', type: 'قداس', title: 'القداس الإلهي لأسرة إعدادي', date: 'الجمعة', time: '07:00 ص', place: 'الكنيسة الكبرى - مذبح الشهيد أبانوب', targetTimestamp: Date.now() + 86400000 * 2 + 3600000 },
                { eventId: 'ev-3', type: 'تسبحة', title: 'تسبحة نصف الليل الأسبوعية', date: 'السبت', time: '09:00 م', place: 'كنيسة السيدة العذراء', targetTimestamp: Date.now() + 86400000 * 3 },
                { eventId: 'ev-4', type: 'رحلة', title: 'يوم روحي وخلوة لدير مارمينا بمريوط', date: 'الخميس بعد القادم', time: '06:30 ص', place: 'التجمع بفناء الكنيسة', targetTimestamp: Date.now() + 86400000 * 7 }
            ]);
            console.log('✅ تم بذر جدول المواعيد والأنشطة');
        }

        // 7. المعاملات المالية
        const financeCount = await Finance.countDocuments();
        if (financeCount === 0) {
            await Finance.insertMany([
                { date: '2026-10-10', desc: 'اشتراكات شهر أكتوبر للمخدومين (دفعة أولى)', cat: 'اشتراكات', amount: 4800, type: 'income', user: 'د. أندرو عماد' },
                { date: '2026-10-11', desc: 'شراء ملازم وكتب نوت ألحان إعدادي', cat: 'ملازم وكتب', amount: 1200, type: 'expense', user: 'أ. فادي جرجس' },
                { date: '2026-10-12', desc: 'مساهمة مباركة وتبرع من أحد الخدام', cat: 'تبرعات', amount: 3500, type: 'income', user: 'أ. مينا صموئيل' },
                { date: '2026-10-14', desc: 'هدايا وجوائز الشمامسة المتميزين في الألحان', cat: 'هدايا وجوائز', amount: 950, type: 'expense', user: 'د. أندرو عماد' }
            ]);
            console.log('✅ تم بذر سجلات الخزينة والماليات');
        }

        // 8. الإعلانات والتنبيهات
        const announcementCount = await Announcement.countDocuments();
        if (announcementCount === 0) {
            await Announcement.insertMany([
                { title: 'تذكير هام بموعد حصة الألحان القادمة', tag: 'عاجل', date: 'اليوم 04:30 م', body: 'سلام يا شباب، الحصة تبدأ تمام السادسة مساءً بقاعة إعدادي، وسنبدأ في تثبيت الربع الثاني من لحن إبؤرو، يرجى إحضار كارت الـ QR لتسجيل الحضور.', author: 'أمين الخدمة' },
                { title: 'مسابقة حفظ مردات القداس والشمامسة', tag: 'ألحان', date: 'أمس', body: 'تعلن الخدمة عن انطلاق مسابقة الشماس المتميز في ألحان ومردات القداس الإلهي، والجمعة القادمة موعد التسميع والتقييم الشهري للحن (إبؤرو) وتوزيع الأوسمة التذكارية.', author: 'معلم الألحان' }
            ]);
            console.log('✅ تم بذر الإعلانات والتنبيهات');
        }

        console.log('✨ اكتملت تهيئة وبذر قاعدة البيانات بنجاح!');
    } catch (error) {
        console.error('❌ حدث خطأ أثناء بذر البيانات:', error.message);
    }
};

module.exports = seedData;
