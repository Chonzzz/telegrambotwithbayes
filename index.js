'use strict';

process.env.NTBA_FIX_319 = 1

//load module
const TelegramBot = require(`node-telegram-bot-api`)
const moment = require(`moment`)
const dclassify = require(`dclassify`)

//inisialisasi token dll
const token_telegram = '635133884:AAHX4dQCPLa4H3Hm1plyf3JHop_xTtgCVrI'
const Classifier = dclassify.Classifier
const DataSet = dclassify.DataSet
const Document = dclassify.Document

//inisialisasi bot telegram
const bot = new TelegramBot(token_telegram, {polling: true});


bot.on('message', (msg) => {
  //bikin list jawab salam selamat malam
  const cari_code1 = new Document('cari_code1', ['bagi','source','code']);
  const cari_code2 = new Document('cari_code2', ['minta','sauce','codenya']);
  const cari_code3 = new Document('cari_code3', ['lihat','kodingan']);
  const cari_code4 = new Document('cari_code4', ['liat','kodingan']);
  const cari_code5 = new Document('cari_code5', ['mau','nyontek','kodingannnya']);

  //bikin list buat cari sapaan
  const cari_hai1 = new Document('cari_hai1', ['hai']);
  const cari_hai2 = new Document('cari_hai2', ['hei']);
  const cari_hai3 = new Document('cari_hai3', ['hi']);
  const cari_hai4 = new Document('cari_hai4', ['hey']);
  const cari_hai5 = new Document('cari_hai5', ['hello']);
  const cari_hai6 = new Document('cari_hai6', ['hallo']);
  const cari_hai7 = new Document('cari_hai7', ['halo']);
  const cari_hai8 = new Document('cari_hai8', ['helo']);
  const cari_hai9 = new Document('cari_hai9', ['woi']);
  const cari_hai10 = new Document('cari_hai10', ['woy']);

  //bikin list jawab salam selamat pagi
  const cari_pagi1 = new Document('cari_pagi1', ['selamat','pagi']);
  const cari_pagi2 = new Document('cari_pagi2', ['met','pagi']);

  //bikin list jawab salam selamat siang
  const cari_siang1 = new Document('cari_siang1', ['selamat','siang']);
  const cari_siang2 = new Document('cari_siang2', ['met','siang']);

  //bikin list jawab salam selamat sore
  const cari_sore1 = new Document('cari_sore1', ['selamat','sore']);
  const cari_sore2 = new Document('cari_sore2', ['met','sore']);

  //bikin list jawab salam selamat malam
  const cari_malam1 = new Document('cari_malam1', ['selamat','malam']);
  const cari_malam2 = new Document('cari_malam2', ['met','malam']);

  //bikin list jawab salam selamat malam
  const cari_terima_kasih1 = new Document('cari_terima_kasih1', ['makasih']);
  const cari_terima_kasih2 = new Document('cari_terima_kasih2', ['thanks']);
  const cari_terima_kasih3 = new Document('cari_terima_kasih3', ['arigathanks']);
  const cari_terima_kasih4 = new Document('cari_terima_kasih4', ['arigato']);
  const cari_terima_kasih5 = new Document('cari_terima_kasih5', ['sankyu']);
  const cari_terima_kasih6 = new Document('cari_terima_kasih6', ['39']);
  const cari_terima_kasih7 = new Document('cari_terima_kasih7', ['tq']);
  const cari_terima_kasih8 = new Document('cari_terima_kasih8', ['ty']);
  const cari_terima_kasih9 = new Document('cari_terima_kasih9', ['terima','kasih']);
  const cari_terima_kasih10 = new Document('cari_terima_kasih10', ['thank','you']);

  //bikin list buat cari menu
  const cari_menu1 = new Document('cari_menu1', ['lihat', 'menunya', 'dong']);
  const cari_menu2 = new Document('cari_menu2', ['tolong', 'tunjukkan', 'menunya']);
  const cari_menu3 = new Document('cari_menu3', ['menunya','apa','saja']);

  //bikin list buat cari restoran
  const cari_restoran1 = new Document('cari_restoran1', ['carikan','rumah','makan']);
  const cari_restoran2 = new Document('cari_restoran2', ['rumah','makan','di mana', 'ya']);
  const cari_restoran3 = new Document('cari_restoran3', ['tolong', 'carikan','restaurant']);
  const cari_restoran4 = new Document('cari_restoran4', ['restoran','di mana','ya']);

  // create a DataSet and add test items to appropriate categories
  // this is 'curated' data for training
  const data = new DataSet();
  data.add('restoran',  [cari_restoran1, cari_restoran2, cari_restoran3, cari_restoran4]);
  data.add('menu', [cari_menu1, cari_menu2, cari_menu3]);
  data.add('source_code', [cari_code1, cari_code2, cari_code3, cari_code4, cari_code5]);
  data.add('pagi', [cari_pagi1, cari_pagi2]);
  data.add('siang', [cari_siang1, cari_siang2]);
  data.add('sore', [cari_sore1, cari_sore2]);
  data.add('malam', [cari_malam1, cari_malam2]);
  data.add('terima_kasih', [cari_terima_kasih1, cari_terima_kasih2, cari_terima_kasih3, cari_terima_kasih4,
    cari_terima_kasih5, cari_terima_kasih6, cari_terima_kasih7, cari_terima_kasih8, cari_terima_kasih9, cari_terima_kasih10])
  data.add('hai', [cari_hai1, cari_hai2, cari_hai3, cari_hai4, cari_hai5, cari_hai6, cari_hai7, cari_hai8,
    cari_hai9, cari_hai10]);

  // an optimisation for working with small vocabularies
  const options = {
      applyInverse: false
  };

  // create a classifier
  const classifier = new Classifier(options);

  // train the classifier
  classifier.train(data);
  //ini kalo udah jadi di-hide aja sama yang bawahnya
  console.log('Classifier trained.');
  console.log(JSON.stringify(classifier.probabilities, null, 4));

  const chatId = msg.chat.id;
  //ngambil username yang nge-chat
  const username = msg.from.first_name;
  //ngambil pesannya, konvert ke huruf kecil, terus dipisah per kata jadi array
  const messageFromUserInArray = msg.text.toLowerCase().split(" ");
  const testDoc = new Document('testDoc', messageFromUserInArray);
  const theResult = classifier.classify(testDoc);
  switch (theResult.category) {
    case 'source_code':
      bot.sendMessage(chatId, 'source code ada di sini, ' + username + ': https://pastebin.com/raw/j2MS3HMi');
      break;
    case 'hai':
      bot.sendMessage(chatId, 'hai juga, ' + username + '!');
      break;
    case 'restoran':
      bot.sendMessage(chatId, 'cari restoran apa, ' + username + '?');
      break;
    case 'menu':
      bot.sendMessage(chatId, 'menu apa, ' + username + '?');
      break;
    case 'pagi':
      bot.sendMessage(chatId, 'halo selamat pagi, ' + username + '!');
      break;
    case 'siang':
      bot.sendMessage(chatId, 'halo selamat siang, ' + username + '!');
      break;
    case 'sore':
      bot.sendMessage(chatId, 'halo selamat sore, ' + username + '!');
      break;
    case 'malam':
      bot.sendMessage(chatId, 'halo selamat malam, ' + username + '!');
      break;
    case 'terima_kasih':
      bot.sendMessage(chatId, 'masama, ' + username + '!');
      break;
  }
  console.log(theResult);
});
