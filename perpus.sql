-- Adminer 4.8.1 MySQL 5.5.5-10.6.4-MariaDB-1:10.6.4+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `anggota_otomasis`;
CREATE TABLE `anggota_otomasis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `pelajar` int(11) DEFAULT 0,
  `guru` int(11) DEFAULT 0,
  `pengunjung_perbulan` int(11) DEFAULT 0,
  `pinjaman_perbulan` int(11) DEFAULT 0,
  `perpustakaan_digital` enum('Sudah','Belum') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `anggota_otomasis` (`id`, `perpustakaan_id`, `pelajar`, `guru`, `pengunjung_perbulan`, `pinjaman_perbulan`, `perpustakaan_digital`, `created_at`, `updated_at`) VALUES
(1,	52,	29,	30,	31,	32,	'Sudah',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `bukus`;
CREATE TABLE `bukus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `kategori_id` bigint(20) NOT NULL,
  `sampul` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `catatan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `download` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aktif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `data_gedungs`;
CREATE TABLE `data_gedungs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `luas_tanah` decimal(12,3) DEFAULT 0.000,
  `luas_gedung` decimal(12,3) DEFAULT 0.000,
  `luas_ruang_tamu` decimal(12,3) DEFAULT 0.000,
  `luas_ruang_sirkulasi` decimal(12,3) DEFAULT 0.000,
  `luas_ruang_baca` decimal(12,3) DEFAULT 0.000,
  `luas_ruang_koleksi` decimal(12,3) DEFAULT 0.000,
  `luas_toilet` decimal(12,3) DEFAULT 0.000,
  `luas_kantin` decimal(12,3) DEFAULT 0.000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `data_gedungs` (`id`, `perpustakaan_id`, `luas_tanah`, `luas_gedung`, `luas_ruang_tamu`, `luas_ruang_sirkulasi`, `luas_ruang_baca`, `luas_ruang_koleksi`, `luas_toilet`, `luas_kantin`, `created_at`, `updated_at`) VALUES
(1,	52,	1.000,	2.000,	3.000,	0.000,	5.000,	6.000,	7.000,	8.000,	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `fasilitas_anggarans`;
CREATE TABLE `fasilitas_anggarans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `internet` tinyint(1) DEFAULT 0,
  `fasilitas_tv` tinyint(1) DEFAULT 0,
  `kantin` tinyint(1) DEFAULT 0,
  `mushollah` tinyint(1) DEFAULT 0,
  `apbn` tinyint(1) DEFAULT 0,
  `apbd` tinyint(1) DEFAULT 0,
  `yayasan` tinyint(1) DEFAULT 0,
  `bantuan` tinyint(1) DEFAULT 0,
  `lainnya` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fasilitas_anggarans` (`id`, `perpustakaan_id`, `internet`, `fasilitas_tv`, `kantin`, `mushollah`, `apbn`, `apbd`, `yayasan`, `bantuan`, `lainnya`, `created_at`, `updated_at`) VALUES
(1,	52,	0,	0,	1,	1,	0,	0,	1,	0,	'Mobil Ranger',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `inboxes`;
CREATE TABLE `inboxes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `jam_operasionals`;
CREATE TABLE `jam_operasionals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `senin_kamis` time DEFAULT NULL,
  `jummat` time DEFAULT NULL,
  `sabtu` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `jam_operasionals` (`id`, `perpustakaan_id`, `senin_kamis`, `jummat`, `sabtu`, `created_at`, `updated_at`) VALUES
(1,	52,	'01:00:00',	'09:50:39',	'03:03:03',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `jenis_perpustakaans`;
CREATE TABLE `jenis_perpustakaans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_jenis_perpustakaan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `jenis_perpustakaans` (`id`, `nama_jenis_perpustakaan`, `level`, `created_at`, `updated_at`) VALUES
(1,	'Perpustakaan Perum Halim Wijayanti',	2,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(2,	'Perpustakaan PD Nugroho',	1,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(3,	'Perpustakaan PT Utami',	0,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(4,	'Perpustakaan CV Damanik Fujiati Tbk',	0,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(5,	'Perpustakaan UD Permadi',	0,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47');

DROP TABLE IF EXISTS `kabupatens`;
CREATE TABLE `kabupatens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_kabupaten` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kabupatens` (`id`, `nama_kabupaten`, `created_at`, `updated_at`) VALUES
(1,	'Babah',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(2,	'Sutoyo',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(3,	'Baranang Siang',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(4,	'Cokroaminoto',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(5,	'Laksamana',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47');

DROP TABLE IF EXISTS `kategoris`;
CREATE TABLE `kategoris` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `kecamatans`;
CREATE TABLE `kecamatans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_kecamatan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kecamatans` (`id`, `nama_kecamatan`, `created_at`, `updated_at`) VALUES
(1,	'Aceh',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(2,	'Sulawesi Barat',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(3,	'Jambi',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(4,	'Jawa Barat',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(5,	'Jawa Tengah',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46');

DROP TABLE IF EXISTS `kelurahans`;
CREATE TABLE `kelurahans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_kelurahan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kelurahans` (`id`, `nama_kelurahan`, `created_at`, `updated_at`) VALUES
(1,	'Sungai Penuh',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(2,	'Bima',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(3,	'Sawahlunto',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(4,	'Mojokerto',	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(5,	'Palopo',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47');

DROP TABLE IF EXISTS `koleksi_materis`;
CREATE TABLE `koleksi_materis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `jumlah_buku_nonfiksi` int(11) DEFAULT 0,
  `jumlah_buku_referensi` int(11) DEFAULT 0,
  `jumlah_buku_fiksi` int(11) DEFAULT 0,
  `jumlah_sk_lokal` int(11) DEFAULT 0,
  `jumlah_terbitan_pemerintah` int(11) DEFAULT 0,
  `jumlah_terbitan_daerah` int(11) DEFAULT 0,
  `jumlah_peta` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `koleksi_materis` (`id`, `perpustakaan_id`, `jumlah_buku_nonfiksi`, `jumlah_buku_referensi`, `jumlah_buku_fiksi`, `jumlah_sk_lokal`, `jumlah_terbitan_pemerintah`, `jumlah_terbitan_daerah`, `jumlah_peta`, `created_at`, `updated_at`) VALUES
(1,	52,	22,	23,	24,	25,	26,	27,	28,	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `konfigurasis`;
CREATE TABLE `konfigurasis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `mendapat_koleksis`;
CREATE TABLE `mendapat_koleksis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `sumber` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `mendapat_koleksis` (`id`, `perpustakaan_id`, `sumber`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1,	52,	'sumber_koleksi',	'Pembelian',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15'),
(2,	52,	'sumber_koleksi',	'Hadiah',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15'),
(3,	52,	'alat_seleksi',	'Daftar Buku Toko Buku',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15'),
(4,	52,	'sistem_layanan',	'Terbuka',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15'),
(5,	52,	'jenis_layanan',	'Internet',	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1,	'2014_10_12_000000_create_users_table',	1),
(2,	'2014_10_12_100000_create_password_resets_table',	1),
(3,	'2019_08_19_000000_create_failed_jobs_table',	1),
(4,	'2019_12_14_000001_create_personal_access_tokens_table',	1),
(5,	'2021_10_19_184709_create_perpustakaans_table',	1),
(6,	'2021_10_20_113922_create_data_gedungs_table',	1),
(7,	'2021_10_20_133827_create_sumber_daya_manusias_table',	1),
(8,	'2021_10_21_060241_create_koleksi_materis_table',	1),
(9,	'2021_10_21_064531_create_mendapat_koleksis_table',	1),
(10,	'2021_10_21_064721_create_jam_operasionals_table',	1),
(11,	'2021_10_21_125149_create_anggota_otomasis_table',	1),
(12,	'2021_10_21_125630_create_sarana_prasaranas_table',	1),
(13,	'2021_10_21_130128_create_fasilitas_anggarans_table',	1),
(14,	'2021_10_22_082546_create_bukus_table',	1),
(15,	'2021_10_22_082716_create_status_bukus_table',	1),
(16,	'2021_10_22_083755_create_kategoris_table',	1),
(17,	'2021_10_29_022837_create_user_profils_table',	1),
(18,	'2021_10_30_024944_create_inboxes_table',	1),
(19,	'2021_10_30_083403_create_konfigurasis_table',	1),
(20,	'2021_11_01_032743_create_kecamatans_table',	1),
(21,	'2021_11_01_032820_create_provinsis_table',	1),
(22,	'2021_11_01_032837_create_kabupatens_table',	1),
(23,	'2021_11_01_032850_create_jenis_perpustakaans_table',	1),
(24,	'2021_11_01_035947_create_kelurahans_table',	1),
(25,	'2021_11_03_050402_create_perpustakaan_roles_table',	1);

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `perpustakaans`;
CREATE TABLE `perpustakaans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `jenis_perpustakaan_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kecamatan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kelurahan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode_pos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provinsi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kabupaten_kota` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_perpustakaan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npsn` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nis` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `struktur_organisasi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_kepala_perpustakaan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_kepala_instansi_induk` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun_berdiri_perpustakaan` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `perpustakaans` (`id`, `user_id`, `jenis_perpustakaan_id`, `nama`, `alamat`, `kecamatan`, `kelurahan`, `kode_pos`, `telp`, `email`, `website`, `provinsi`, `kabupaten_kota`, `status_perpustakaan`, `npsn`, `nis`, `struktur_organisasi`, `nama_kepala_perpustakaan`, `nama_kepala_instansi_induk`, `tahun_berdiri_perpustakaan`, `created_at`, `updated_at`) VALUES
(1,	3,	'3',	'Perpustakaan Ani Hastuti M.Pd',	'Jr. M.T. Haryono No. 530, Mojokerto 29503, Pabar',	'Sulawesi Barat',	'Mojokerto',	'92900',	'021 0937 9803',	'nadine.wasita@gmail.com',	'puspasari.asia',	'Pulau Man',	'Laksamana',	'Negeri',	'6011978852607812',	NULL,	'eligendi',	'Aisyah Hassanah',	'Lulut Dadi Prayoga',	2017,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(2,	3,	'4',	'Perpustakaan Cinthia Hesti Rahayu',	'Dk. Gardujati No. 103, Kediri 88228, Lampung',	'Jawa Tengah',	'Palopo',	'78379',	'028 5841 3589',	'rahmi27@yahoo.co.id',	'rahayu.co',	'Singapura',	'Babah',	'Negeri',	'4539916905940812',	NULL,	'consectetur',	'Harsaya Mandala',	'Ganda Narpati',	2007,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(3,	3,	'5',	'Perpustakaan Kenzie Marpaung',	'Ki. Jaksa No. 175, Cirebon 95677, NTB',	'Aceh',	'Palopo',	'48255',	'(+62) 932 4735 776',	'najwa17@hutapea.net',	'januar.web.id',	'Gabon',	'Sutoyo',	'Negeri',	'5330023082193667',	NULL,	'voluptatem',	'Kani Farida',	'Rahmi Widiastuti',	1984,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(4,	3,	'1',	'Perpustakaan Zaenab Maryati S.Gz',	'Jr. Otto No. 550, Magelang 26552, Lampung',	'Sulawesi Barat',	'Mojokerto',	'68831',	'(+62) 458 2863 951',	'paiman16@gmail.co.id',	'yolanda.my.id',	'Gabon',	'Cokroaminoto',	'Negeri',	'2318446999838293',	NULL,	'aut',	'Warta Saefullah S.T.',	'Mahesa Mustofa S.Farm',	1996,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(5,	3,	'4',	'Perpustakaan Humaira Oktaviani',	'Ki. Madrasah No. 420, Palopo 43704, Bengkulu',	'Jawa Barat',	'Palopo',	'40532',	'028 6745 7315',	'salsabila.rahayu@sitompul.ac.id',	'manullang.asia',	'Gabon',	'Babah',	'Negeri',	'5532791639572601',	NULL,	'tempora',	'Elma Purwanti S.Pd',	'Ajimat Sihotang',	1981,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(6,	3,	'4',	'Perpustakaan Hamima Kuswandari',	'Ki. R.E. Martadinata No. 281, Serang 93842, Bali',	'Aceh',	'Sawahlunto',	'23149',	'(+62) 481 2006 075',	'laras35@gmail.com',	'gunarto.name',	'Gabon',	'Babah',	'Negeri',	'3589607729553607',	NULL,	'voluptas',	'Kasiyah Yessi Prastuti',	'Atmaja Gangsa Simanjuntak M.Pd',	2019,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(7,	3,	'2',	'Perpustakaan Elvin Nababan M.Ak',	'Dk. Madiun No. 549, Pangkal Pinang 99513, Jatim',	'Sulawesi Barat',	'Bima',	'67404',	'0618 1103 915',	'satya21@gmail.co.id',	'kusmawati.go.id',	'Pulau Man',	'Baranang Siang',	'Negeri',	'6011396118712997',	NULL,	'numquam',	'Gandi Zulkarnain',	'Hasan Wijaya',	2020,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(8,	3,	'3',	'Perpustakaan Taufik Lazuardi',	'Kpg. Sentot Alibasa No. 814, Cilegon 89901, Kalsel',	'Jawa Barat',	'Sungai Penuh',	'12446',	'0854 2645 5198',	'gasti.thamrin@gmail.co.id',	'wahyudin.asia',	'Pulau Man',	'Sutoyo',	'Negeri',	'4929876801533194',	NULL,	'velit',	'Kariman Mustofa M.TI.',	'Dodo Harsana Firgantoro',	1995,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(9,	3,	'5',	'Perpustakaan Elisa Salwa Wijayanti M.Farm',	'Ds. Sadang Serang No. 592, Pontianak 94738, NTT',	'Jawa Barat',	'Sawahlunto',	'17253',	'0283 2177 652',	'kprastuti@gmail.co.id',	'maryati.web.id',	'Singapura',	'Laksamana',	'Negeri',	'2308486765623828',	NULL,	'repellendus',	'Rizki Thamrin M.Pd',	'Putu Sihotang',	1996,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(10,	3,	'1',	'Perpustakaan Widya Handayani S.Kom',	'Jln. Halim No. 508, Madiun 81716, Sumut',	'Aceh',	'Mojokerto',	'87780',	'0849 647 971',	'epudjiastuti@padmasari.go.id',	'wulandari.in',	'Mozambik',	'Laksamana',	'Negeri',	'4556260445183122',	NULL,	'consequuntur',	'Mariadi Saragih',	'Maryadi Ilyas Waskita S.E.',	1980,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(11,	3,	'5',	'Perpustakaan Maria Mulyani',	'Kpg. Cihampelas No. 269, Tanjungbalai 41467, Jatim',	'Sulawesi Barat',	'Palopo',	'52275',	'(+62) 640 6567 070',	'mwaskita@gmail.com',	'puspasari.sch.id',	'Singapura',	'Cokroaminoto',	'Negeri',	'5557577983009344',	NULL,	'adipisci',	'Yani Maryati M.TI.',	'Gasti Nuraini S.Ked',	1998,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(12,	3,	'5',	'Perpustakaan Umay Caraka Utama',	'Dk. Baranang Siang No. 214, Solok 59993, Bali',	'Jawa Tengah',	'Sawahlunto',	'21512',	'0650 7526 660',	'maryanto.zulkarnain@permata.mil.id',	'wastuti.or.id',	'Singapura',	'Sutoyo',	'Negeri',	'4556058412847228',	NULL,	'aut',	'Dariati Harsanto Hutapea',	'Warsita Irawan',	2008,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(13,	3,	'1',	'Perpustakaan Ilyas Simbolon M.Ak',	'Gg. Dewi Sartika No. 525, Parepare 55307, Kepri',	'Jawa Barat',	'Sungai Penuh',	'32820',	'0795 3362 1419',	'wastuti.gatra@wastuti.go.id',	'wulandari.net',	'Pulau Man',	'Cokroaminoto',	'Negeri',	'3528788916048355',	NULL,	'natus',	'Cakrawangsa Mandala',	'Vino Hutagalung',	1971,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(14,	3,	'3',	'Perpustakaan Laksana Hakim',	'Kpg. Tambun No. 511, Gorontalo 56780, Sulut',	'Jambi',	'Sawahlunto',	'44781',	'(+62) 817 1380 448',	'agustina.bella@yahoo.co.id',	'mustofa.desa.id',	'Pulau Man',	'Sutoyo',	'Negeri',	'4485325835549673',	NULL,	'iste',	'Ade Anggraini',	'Agus Budiman S.H.',	1981,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(15,	3,	'1',	'Perpustakaan Lidya Farida M.TI.',	'Jln. Baya Kali Bungur No. 846, Semarang 58673, Kalteng',	'Aceh',	'Mojokerto',	'50624',	'0513 9676 2701',	'ida00@gmail.co.id',	'suartini.sch.id',	'Singapura',	'Cokroaminoto',	'Negeri',	'347987290987338',	NULL,	'sunt',	'Taufan Irawan M.Farm',	'Talia Hastuti S.Farm',	2015,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(16,	3,	'5',	'Perpustakaan Sarah Andriani S.E.I',	'Jln. Barat No. 906, Pangkal Pinang 98565, Kaltim',	'Sulawesi Barat',	'Palopo',	'95372',	'0621 0146 4676',	'thamrin.raisa@gmail.co.id',	'nasyidah.name',	'Mozambik',	'Cokroaminoto',	'Negeri',	'347351399117570',	NULL,	'rerum',	'Gamblang Waluyo',	'Murti Galih Zulkarnain S.Pt',	2004,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(17,	3,	'3',	'Perpustakaan Karimah Palastri',	'Ki. Basket No. 949, Sabang 68819, Sulsel',	'Jawa Barat',	'Bima',	'25678',	'023 7979 1946',	'devi.wahyuni@gmail.com',	'gunawan.desa.id',	'Singapura',	'Babah',	'Negeri',	'4556888822269187',	NULL,	'cupiditate',	'Daru Sihombing',	'Cengkal Elon Sihotang',	2005,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(18,	3,	'3',	'Perpustakaan Cahyo Napitupulu',	'Gg. Sam Ratulangi No. 596, Semarang 95100, Kepri',	'Sulawesi Barat',	'Mojokerto',	'29315',	'(+62) 820 546 997',	'eja26@gmail.co.id',	'sirait.mil.id',	'Mozambik',	'Babah',	'Negeri',	'376898702569610',	NULL,	'non',	'Malika Palastri',	'Rina Yolanda',	1997,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(19,	3,	'1',	'Perpustakaan Salman Olga Januar S.E.',	'Jr. Baja Raya No. 596, Surakarta 36652, Sulut',	'Jawa Tengah',	'Sawahlunto',	'73272',	'(+62) 887 3872 294',	'mahesa.susanti@gmail.com',	'rahmawati.ac.id',	'Gabon',	'Laksamana',	'Negeri',	'6011951330628437',	NULL,	'deleniti',	'Cemplunk Karsana Najmudin',	'Waluyo Jaiman Maryadi S.E.',	2011,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(20,	3,	'1',	'Perpustakaan Tri Umar Thamrin',	'Ds. Bahagia No. 877, Padang 86074, Sulbar',	'Jambi',	'Bima',	'15760',	'0491 5426 166',	'pertiwi.lukman@novitasari.name',	'hidayanto.co.id',	'Singapura',	'Cokroaminoto',	'Negeri',	'2399277960717980',	NULL,	'omnis',	'Harja Kuswoyo',	'Putri Puspasari',	2014,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(21,	3,	'2',	'Perpustakaan Yance Kusmawati',	'Psr. Sutarto No. 774, Bengkulu 54711, Jateng',	'Jawa Tengah',	'Mojokerto',	'41077',	'0652 8913 7626',	'mardhiyah.dadap@sitorus.biz.id',	'nuraini.asia',	'Guam',	'Sutoyo',	'Negeri',	'4929715907474079',	NULL,	'molestiae',	'Raina Ella Laksmiwati M.Farm',	'Panca Bakianto Kusumo',	1994,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(22,	3,	'4',	'Perpustakaan Murti Sihotang',	'Gg. Jend. Sudirman No. 212, Parepare 31489, Malut',	'Sulawesi Barat',	'Palopo',	'80044',	'023 9733 2784',	'rahmat.laksmiwati@palastri.co',	'halim.sch.id',	'Mozambik',	'Sutoyo',	'Negeri',	'4716977904842685',	NULL,	'provident',	'Ratih Jamalia Usada S.Farm',	'Rachel Rahayu',	1992,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(23,	3,	'4',	'Perpustakaan Ikhsan Mahesa Dongoran M.Kom.',	'Ki. Reksoninten No. 2, Bau-Bau 74058, Kepri',	'Aceh',	'Mojokerto',	'34369',	'0931 3561 997',	'wprasetya@budiyanto.name',	'nurdiyanti.sch.id',	'Guam',	'Cokroaminoto',	'Negeri',	'4532190553507235',	NULL,	'expedita',	'Radika Najmudin',	'Cakrabuana Gangsa Waluyo',	1982,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(24,	3,	'5',	'Perpustakaan Jefri Nugroho M.Pd',	'Gg. Adisucipto No. 847, Tangerang 31551, Maluku',	'Jambi',	'Sungai Penuh',	'21916',	'(+62) 957 3839 068',	'ibrani03@yahoo.com',	'nuraini.biz.id',	'Pulau Man',	'Sutoyo',	'Negeri',	'5344176897373819',	NULL,	'corrupti',	'Ismail Jailani',	'Gadang Waskita',	1973,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(25,	3,	'1',	'Perpustakaan Gandewa Prasasta S.Gz',	'Gg. Gegerkalong Hilir No. 120, Padangsidempuan 95035, Kalteng',	'Sulawesi Barat',	'Bima',	'20702',	'0829 777 816',	'novitasari.vicky@yahoo.co.id',	'damanik.or.id',	'Guam',	'Cokroaminoto',	'Negeri',	'2357134200795047',	NULL,	'molestiae',	'Siti Nuraini',	'Wahyu Wibowo',	1988,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(26,	3,	'1',	'Perpustakaan Zaenab Ifa Hassanah S.IP',	'Psr. Kebangkitan Nasional No. 905, Bau-Bau 49232, Kalsel',	'Aceh',	'Sawahlunto',	'23172',	'(+62) 25 6745 2036',	'hidayanto.zulaikha@wibowo.in',	'sihombing.mil.id',	'Pulau Man',	'Babah',	'Negeri',	'2221568891580271',	NULL,	'qui',	'Karsa Marwata Prasetya',	'Nilam Lestari',	1974,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(27,	3,	'2',	'Perpustakaan Silvia Wastuti',	'Dk. Tambak No. 102, Banjar 90025, Aceh',	'Sulawesi Barat',	'Palopo',	'85125',	'0342 0156 0254',	'bala25@yahoo.co.id',	'lestari.com',	'Gabon',	'Babah',	'Negeri',	'2720381336501266',	NULL,	'sequi',	'Salman Saputra',	'Wakiman Wibisono',	2006,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(28,	3,	'4',	'Perpustakaan Endah Astuti',	'Psr. Baranangsiang No. 106, Metro 98625, Banten',	'Sulawesi Barat',	'Sungai Penuh',	'10283',	'0218 5549 5658',	'etampubolon@gmail.com',	'wastuti.biz',	'Mozambik',	'Babah',	'Negeri',	'371886304114237',	NULL,	'similique',	'Daruna Tampubolon',	'Wardi Prasasta S.Pd',	1999,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(29,	3,	'4',	'Perpustakaan Jarwi Simbolon S.Pt',	'Dk. Cikapayang No. 539, Balikpapan 85280, Aceh',	'Sulawesi Barat',	'Sawahlunto',	'39448',	'0605 7116 337',	'uusamah@usada.biz',	'siregar.co',	'Gabon',	'Sutoyo',	'Negeri',	'4485235345544959',	NULL,	'cupiditate',	'Usyi Uyainah',	'Dagel Wadi Waluyo S.Psi',	1988,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(30,	3,	'4',	'Perpustakaan Maman Adriansyah',	'Dk. Gajah No. 990, Padang 73073, Pabar',	'Sulawesi Barat',	'Sawahlunto',	'91388',	'(+62) 251 7345 2978',	'umayasari@puspasari.co.id',	'mangunsong.my.id',	'Guam',	'Cokroaminoto',	'Negeri',	'2720640628773051',	NULL,	'labore',	'Maya Riyanti S.Pd',	'Queen Uyainah',	2001,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(31,	3,	'5',	'Perpustakaan Kuncara Prabowo M.M.',	'Psr. Bawal No. 505, Serang 51340, Riau',	'Sulawesi Barat',	'Sungai Penuh',	'85970',	'0810 184 991',	'maulana.febi@gmail.com',	'sitorus.net',	'Singapura',	'Babah',	'Negeri',	'4485785569868955',	NULL,	'quaerat',	'Kenes Budiman',	'Tira Farida',	1990,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(32,	3,	'3',	'Perpustakaan Cornelia Widiastuti',	'Gg. Panjaitan No. 754, Tomohon 11221, Kalbar',	'Aceh',	'Bima',	'94344',	'(+62) 597 5114 459',	'xmaheswara@gmail.co.id',	'pangestu.in',	'Gabon',	'Laksamana',	'Negeri',	'3589147564593301',	NULL,	'quia',	'Ade Winarsih',	'Dalimin Prasetya',	2011,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(33,	3,	'3',	'Perpustakaan Purwanto Wacana',	'Dk. Kyai Mojo No. 652, Bontang 60647, Kaltim',	'Jawa Tengah',	'Sawahlunto',	'21485',	'0461 1348 008',	'chelsea.nasyiah@suryono.co.id',	'sihombing.web.id',	'Gabon',	'Babah',	'Negeri',	'5523243270673240',	NULL,	'nam',	'Lega Wawan Zulkarnain',	'Margana Jailani',	1975,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(34,	3,	'1',	'Perpustakaan Gandi Putra M.Pd',	'Ki. Ciwastra No. 388, Surakarta 85402, Lampung',	'Jawa Barat',	'Mojokerto',	'45561',	'0327 8485 2204',	'anastasia87@haryanto.com',	'maheswara.org',	'Singapura',	'Sutoyo',	'Negeri',	'376217942754330',	NULL,	'beatae',	'Amalia Wastuti',	'Ade Handayani',	2014,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(35,	3,	'4',	'Perpustakaan Hani Rahmawati',	'Dk. Muwardi No. 440, Pariaman 14289, Sumbar',	'Jambi',	'Sawahlunto',	'98437',	'(+62) 269 2422 8943',	'pangestu33@yahoo.com',	'susanti.ac.id',	'Singapura',	'Cokroaminoto',	'Negeri',	'4556904149907423',	NULL,	'necessitatibus',	'Widya Sudiati',	'Kania Kusmawati',	1973,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(36,	3,	'1',	'Perpustakaan Clara Nurdiyanti',	'Ds. Teuku Umar No. 663, Blitar 74079, Riau',	'Aceh',	'Sungai Penuh',	'12673',	'0654 9480 3980',	'gawati.zulkarnain@yuniar.web.id',	'mansur.name',	'Singapura',	'Babah',	'Negeri',	'4532014434540',	NULL,	'et',	'Kajen Pangestu',	'Ajimat Ganjaran Tarihoran S.Psi',	1993,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(37,	3,	'1',	'Perpustakaan Amelia Qori Rahimah',	'Jln. Fajar No. 606, Bekasi 66596, DKI',	'Sulawesi Barat',	'Sungai Penuh',	'13511',	'0652 4963 1533',	'prayoga.lutfan@gmail.com',	'hutasoit.desa.id',	'Mozambik',	'Laksamana',	'Negeri',	'4716029999508779',	NULL,	'voluptatibus',	'Hari Wasita',	'Sabrina Kezia Wahyuni S.Gz',	1990,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(38,	3,	'5',	'Perpustakaan Restu Wijayanti',	'Ds. Kiaracondong No. 193, Denpasar 20692, Bali',	'Sulawesi Barat',	'Palopo',	'81672',	'0401 7446 636',	'kyuliarti@manullang.web.id',	'maulana.sch.id',	'Singapura',	'Baranang Siang',	'Negeri',	'4539892561133036',	NULL,	'laboriosam',	'Mursinin Saefullah',	'Cindy Padmasari',	1972,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(39,	3,	'5',	'Perpustakaan Tami Ina Rahimah S.Psi',	'Jln. Ciumbuleuit No. 575, Magelang 17235, Lampung',	'Sulawesi Barat',	'Palopo',	'89231',	'0879 893 544',	'yulianti.jelita@kuswoyo.biz.id',	'pudjiastuti.my.id',	'Singapura',	'Sutoyo',	'Negeri',	'4716494557618354',	NULL,	'cupiditate',	'Vivi Aryani',	'Jane Laksmiwati',	2013,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(40,	3,	'3',	'Perpustakaan Faizah Icha Lailasari M.Ak',	'Psr. Sutoyo No. 301, Administrasi Jakarta Utara 86271, Kaltara',	'Aceh',	'Sungai Penuh',	'59545',	'(+62) 376 7906 200',	'vfarida@yahoo.co.id',	'wulandari.mil.id',	'Guam',	'Baranang Siang',	'Negeri',	'2638642300809709',	NULL,	'asperiores',	'Aswani Mangunsong',	'Gading Kurniawan',	2019,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(41,	3,	'5',	'Perpustakaan Ajiono Widodo',	'Ds. Sam Ratulangi No. 851, Lhokseumawe 17695, Jateng',	'Jawa Barat',	'Palopo',	'85926',	'(+62) 950 1552 574',	'yoga.mardhiyah@farida.biz',	'dongoran.name',	'Singapura',	'Sutoyo',	'Negeri',	'349227606623626',	NULL,	'odit',	'Ulya Rahmawati',	'Unjani Anggraini S.Farm',	1988,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(42,	3,	'1',	'Perpustakaan Sakura Aryani',	'Dk. Moch. Yamin No. 814, Cirebon 25720, Sumbar',	'Jawa Tengah',	'Mojokerto',	'22283',	'029 8302 6800',	'wahyu96@napitupulu.go.id',	'mustofa.biz.id',	'Singapura',	'Cokroaminoto',	'Negeri',	'5349562954368898',	NULL,	'rerum',	'Cakrawangsa Sabri Mahendra',	'Arta Firgantoro S.Psi',	2008,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(43,	3,	'3',	'Perpustakaan Dalimin Jayadi Ramadan S.Pd',	'Jr. Bata Putih No. 72, Sukabumi 50166, NTB',	'Jambi',	'Palopo',	'67513',	'0438 5846 3046',	'ghaliyati.kusmawati@gmail.co.id',	'prasetyo.go.id',	'Pulau Man',	'Babah',	'Negeri',	'6011652368425601',	NULL,	'voluptas',	'Kamidin Adriansyah M.Farm',	'Jumari Sihombing S.Gz',	1978,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(44,	3,	'2',	'Perpustakaan Radit Luwar Tamba S.Pt',	'Ki. Tentara Pelajar No. 683, Palu 98957, Sulbar',	'Aceh',	'Palopo',	'41176',	'0535 1852 4731',	'bakiono.waskita@palastri.asia',	'mardhiyah.biz.id',	'Gabon',	'Sutoyo',	'Negeri',	'4716369081099570',	NULL,	'ut',	'Kania Halima Namaga S.H.',	'Umay Prayoga',	2000,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(45,	3,	'4',	'Perpustakaan Danu Bakijan Ramadan',	'Jr. Antapani Lama No. 942, Makassar 68377, Sumsel',	'Jawa Tengah',	'Sawahlunto',	'70967',	'(+62) 555 8813 4913',	'vmegantara@yahoo.com',	'najmudin.name',	'Mozambik',	'Babah',	'Negeri',	'4716739992268664',	NULL,	'voluptatem',	'Wasis Natsir',	'Siska Talia Laksmiwati',	2002,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(46,	3,	'4',	'Perpustakaan Hadi Raharja Prakasa S.E.I',	'Jln. Soekarno Hatta No. 644, Cilegon 30585, Gorontalo',	'Jawa Tengah',	'Bima',	'40776',	'(+62) 823 4573 109',	'mansur.dian@andriani.in',	'nasyidah.org',	'Gabon',	'Sutoyo',	'Negeri',	'5560147449305580',	NULL,	'officia',	'Kurnia Arsipatra Wacana',	'Bakiadi Lazuardi',	2001,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(47,	3,	'1',	'Perpustakaan Jail Permadi',	'Jr. Bass No. 766, Bau-Bau 28862, Sultra',	'Aceh',	'Bima',	'51831',	'(+62) 22 5026 634',	'irsad95@yuniar.net',	'yuliarti.id',	'Gabon',	'Baranang Siang',	'Negeri',	'5429546363868633',	NULL,	'et',	'Dalima Suartini',	'Lukita Narpati',	2007,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(48,	3,	'1',	'Perpustakaan Leo Mansur',	'Gg. BKR No. 20, Makassar 25777, Sulsel',	'Jambi',	'Sungai Penuh',	'22443',	'(+62) 411 1906 2730',	'twaskita@gmail.com',	'handayani.in',	'Guam',	'Baranang Siang',	'Negeri',	'6011872992323697',	NULL,	'omnis',	'Mustofa Harjo Nashiruddin S.H.',	'Rahayu Zulaika',	1991,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(49,	3,	'3',	'Perpustakaan Eli Cici Susanti S.E.I',	'Gg. Basoka Raya No. 955, Tomohon 49914, Sulbar',	'Sulawesi Barat',	'Mojokerto',	'41064',	'(+62) 390 5735 1154',	'hakim.yahya@sirait.net',	'suryatmi.co.id',	'Mozambik',	'Sutoyo',	'Negeri',	'2415979477823215',	NULL,	'ut',	'Prayogo Sitompul',	'Jati Mahendra',	1974,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(50,	3,	'4',	'Perpustakaan Lili Salwa Suartini S.Gz',	'Dk. Gajah No. 386, Blitar 79682, Sulsel',	'Jawa Barat',	'Sawahlunto',	'14227',	'0455 8831 0303',	'qtarihoran@utami.com',	'maheswara.my.id',	'Gabon',	'Sutoyo',	'Negeri',	'5217692063279170',	NULL,	'placeat',	'Unjani Laras Susanti',	'Olivia Purnawati',	2004,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(51,	3,	'5',	'Perpustakaan Dalima Kania Yulianti M.TI.',	'Jr. Gatot Subroto No. 989, Tarakan 26153, Jateng',	'Jawa Barat',	'Mojokerto',	'59262',	'(+62) 655 7720 1929',	'setiawan.legawa@yahoo.com',	'nurdiyanti.go.id',	'Gabon',	'Babah',	'Negeri',	'4556995465783919',	NULL,	'ipsum',	'Yessi Wulandari',	'Janet Almira Utami S.Pd',	2013,	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(52,	1,	'1',	'Perpus With Relations',	'Grand Tsamara',	'Aceh',	'Sungai Penuh',	'76115',	'081254982664',	'julian.aryo1989@gmail.com',	'https://vjtechsolution.com',	'Guam',	'Babah',	'Negeri',	'123456',	'654321',	'Struktur Organisasi',	'Bejo',	'Tejo',	2000,	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `perpustakaan_roles`;
CREATE TABLE `perpustakaan_roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role` enum('member','operator') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'member',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `perpustakaan_roles` (`id`, `perpustakaan_id`, `user_id`, `role`, `created_at`, `updated_at`) VALUES
(1,	1,	2,	'operator',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(2,	4,	3,	'member',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47');

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1,	'App\\Models\\User',	1,	'bsamosir@example.net',	'f356b4dd3fae0cd67241b89420c5b45fab001b90e4a9006f0370a4cb760252a0',	'[\"role-admin\"]',	'2021-11-08 02:18:22',	'2021-11-07 13:58:07',	'2021-11-08 02:18:22'),
(2,	'App\\Models\\User',	1,	'bsamosir@example.net',	'ae1bd8221972db8c6436ac2a992767193ba148266bacae4153bc1da62710835b',	'[\"role-admin\"]',	'2021-11-08 08:27:47',	'2021-11-08 02:19:21',	'2021-11-08 08:27:47'),
(3,	'App\\Models\\User',	1,	'bsamosir@example.net',	'cb94dad2e0354714dee63c0a59067a16c99bc70f50c1acdfc5428848d2c40c90',	'[\"role-admin\"]',	'2021-11-08 18:21:53',	'2021-11-08 12:05:16',	'2021-11-08 18:21:53'),
(4,	'App\\Models\\User',	1,	'bsamosir@example.net',	'4b47f94a611284b163975ee1a9b0dae6cf50aa5339b1c62d25dc700b5b129e65',	'[\"role-admin\"]',	'2021-11-09 03:15:39',	'2021-11-09 01:19:13',	'2021-11-09 03:15:39'),
(5,	'App\\Models\\User',	1,	'bsamosir@example.net',	'6280effb9fe02eb6326bc3dcb22cc0f7b6260da6fccf7368d3914a34dbeae142',	'[\"role-admin\"]',	'2021-11-09 07:26:22',	'2021-11-09 04:01:06',	'2021-11-09 07:26:22');

DROP TABLE IF EXISTS `provinsis`;
CREATE TABLE `provinsis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_provinsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `provinsis` (`id`, `nama_provinsi`, `created_at`, `updated_at`) VALUES
(1,	'Guam',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(2,	'Gabon',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(3,	'Mozambik',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(4,	'Singapura',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47'),
(5,	'Pulau Man',	'2021-11-07 13:57:47',	'2021-11-07 13:57:47');

DROP TABLE IF EXISTS `sarana_prasaranas`;
CREATE TABLE `sarana_prasaranas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `operasional_roda_empat` int(11) DEFAULT 0,
  `operasional_roda_dua` int(11) DEFAULT 0,
  `rak_buku` int(11) DEFAULT 0,
  `rak_majalah` int(11) DEFAULT 0,
  `rak_surat_kabar` int(11) DEFAULT 0,
  `rak_penitipan_barang` int(11) DEFAULT 0,
  `filling_kabinet` int(11) DEFAULT 0,
  `meja_baca` int(11) DEFAULT 0,
  `meja_sirkulasi` int(11) DEFAULT 0,
  `meja_kerja` int(11) DEFAULT 0,
  `kursi_kerja` int(11) DEFAULT 0,
  `kursi_tamu` int(11) DEFAULT 0,
  `komputer` int(11) DEFAULT 0,
  `sarana_tv` int(11) DEFAULT 0,
  `ac` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sarana_prasaranas` (`id`, `perpustakaan_id`, `operasional_roda_empat`, `operasional_roda_dua`, `rak_buku`, `rak_majalah`, `rak_surat_kabar`, `rak_penitipan_barang`, `filling_kabinet`, `meja_baca`, `meja_sirkulasi`, `meja_kerja`, `kursi_kerja`, `kursi_tamu`, `komputer`, `sarana_tv`, `ac`, `created_at`, `updated_at`) VALUES
(1,	52,	33,	34,	35,	36,	37,	38,	39,	40,	41,	42,	43,	44,	45,	46,	47,	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `status_bukus`;
CREATE TABLE `status_bukus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `buku_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `pinjam` tinyint(1) NOT NULL DEFAULT 1,
  `internal` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `sumber_daya_manusias`;
CREATE TABLE `sumber_daya_manusias` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `perpustakaan_id` bigint(20) NOT NULL,
  `seluruh_pegawai` int(11) DEFAULT 0,
  `pns` int(11) DEFAULT 0,
  `pejabat_fungsional` int(11) DEFAULT 0,
  `honorer` int(11) DEFAULT 0,
  `kepala_perpustakaan` int(11) DEFAULT 0,
  `tenaga_teknis_perpustakaan` int(11) DEFAULT 0,
  `tenaga_administrasi` int(11) DEFAULT 0,
  `sd` int(11) DEFAULT 0,
  `smp` int(11) DEFAULT 0,
  `diklat` int(11) DEFAULT 0,
  `s1_perpustakaan` int(11) DEFAULT 0,
  `s1_diklat` int(11) DEFAULT 0,
  `s1_non_perpustakaan` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sumber_daya_manusias` (`id`, `perpustakaan_id`, `seluruh_pegawai`, `pns`, `pejabat_fungsional`, `honorer`, `kepala_perpustakaan`, `tenaga_teknis_perpustakaan`, `tenaga_administrasi`, `sd`, `smp`, `diklat`, `s1_perpustakaan`, `s1_diklat`, `s1_non_perpustakaan`, `created_at`, `updated_at`) VALUES
(1,	52,	9,	10,	11,	12,	13,	14,	15,	16,	17,	18,	19,	20,	21,	'2021-11-08 02:07:18',	'2021-11-09 06:50:15');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','perpustakaan','public') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1,	'bsamosir@example.net',	'$2y$10$w1EEnLufArzGatrtnt6v2eSyPk.00wIZboAXilVXQDYBDwJkqsD7S',	'admin',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(2,	'balangga20@example.com',	'$2y$10$SxFNrDT7kngNNLsAgKR8oulfT9SLH4O75uXaabf8MFKqqQa6hdSXC',	'perpustakaan',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(3,	'rahayu.jono@example.com',	'$2y$10$eeMh9hViPyGCqAshMqFoEeVnMCd6R0zLNeZTlysmrAIPIKDfRSVby',	'public',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46');

DROP TABLE IF EXISTS `user_profils`;
CREATE TABLE `user_profils` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `nama` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_identitas` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npsn` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sekolah` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kelas` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user_profils` (`id`, `user_id`, `nama`, `no_identitas`, `npsn`, `email`, `no_hp`, `sekolah`, `kelas`, `alamat`, `catatan`, `created_at`, `updated_at`) VALUES
(1,	1,	'Harsana Warta Situmorang S.E.',	'833124533',	'49782863-e6d9-3ee8-b832-c919be64e6cf',	'maimunah.marbun@gmail.com',	'0997 5359 1630',	'Sekolah Banceng Pondok',	'12',	'Jln. Sunaryo No. 735, Padang 52360, Pabar',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(2,	2,	'Putri Rahimah',	'684913972',	'f256b6b4-298a-3405-811d-a766a80fac41',	'habibi.hana@mayasari.or.id',	'(+62) 948 7971 8848',	'Sekolah Bara',	'9',	'Psr. Ahmad Dahlan No. 931, Bukittinggi 95321, Kaltara',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46'),
(3,	3,	'Galih Sabri Wibowo',	'561585581',	'07d60de7-5808-3195-8ae4-ef943e5d94fa',	'bakti.pradana@suartini.in',	'(+62) 335 5035 3271',	'Sekolah Pacuan Kuda',	'9',	'Ds. Merdeka No. 21, Padang 80380, Sumbar',	NULL,	'2021-11-07 13:57:46',	'2021-11-07 13:57:46');

-- 2021-11-09 07:26:26
