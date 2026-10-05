// Dữ liệu hướng dẫn Dungeon Mayhem (tóm tắt bằng lời riêng, không chép chữ trên lá bài).
// Muốn sửa/thêm nhân vật: chỉnh mảng CHARACTERS bên dưới, đẩy lên GitHub là Netlify tự cập nhật.

window.SETS = {
  base: { name: "Bản gốc", note: "4 anh hùng đầu tiên" },
  bg: { name: "Battle for Baldur's Gate", note: "Mở rộng 1 – 2 anh hùng" },
  mm: { name: "Monster Madness", note: "Mở rộng 2 – 6 quái vật, chơi tới 6 người" },
};

window.SYMBOLS = [
  { id: "attack", name: "Tấn công", short: "Mỗi biểu tượng = 1 sát thương lên người (hoặc lá khiên) bạn chọn." },
  { id: "shield", name: "Khiên", short: "Đặt lá xuống trước mặt. Mỗi biểu tượng chặn được 1 sát thương. Hết biểu tượng thì lá bị phá." },
  { id: "heart", name: "Hồi máu", short: "Mỗi biểu tượng hồi 1 máu. Tối đa 10 máu." },
  { id: "draw", name: "Rút bài", short: "Mỗi biểu tượng rút thêm 1 lá lên tay." },
  { id: "bolt", name: "Đánh thêm", short: "Mỗi biểu tượng bắt buộc đánh thêm 1 lá trong lượt này." },
  { id: "power", name: "Sức mạnh đặc biệt", short: "Lá Mighty Power riêng của từng nhân vật. Làm đúng như chữ in trên lá." },
];

window.CHARACTERS = [
  // ---------- BẢN GỐC ----------
  {
    id: "sutha", set: "base", emoji: "🪓", color: "#C8452F",
    name: "Sutha", title: "the Skullcrusher", role: "Chiến binh man rợ",
    style: "Đánh mạnh nhất bàn. Ít mưu mẹo, chủ yếu dồn sát thương thật nhanh.",
    strengths: ["attack", "heart"],
    powers: [
      { name: "Rage", desc: "Một đòn 4 sát thương vào một mục tiêu – mạnh nhất trong bộ gốc." },
      { name: "Whirling Axes", desc: "Mỗi đối thủ mất 1 máu, và bạn hồi lại 1 máu cho mỗi đối thủ trúng đòn." },
      { name: "Mighty Toss", desc: "Phá ngay một lá khiên của đối thủ, rồi làm theo biểu tượng in thêm trên lá." },
    ],
    tips: [
      "Giữ Rage để kết liễu người còn ít máu, hoặc dồn vào khi họ hết khiên.",
      "Whirling Axes càng mạnh khi bàn càng đông.",
      "Hai chú chó Riff và Raff là khiên của bạn.",
    ],
  },
  {
    id: "azzan", set: "base", emoji: "🔮", color: "#3E6FD8",
    name: "Azzan", title: "the Mystic", role: "Pháp sư",
    style: "Cân bằng nhất bộ gốc, có những lá lật ngược thế trận.",
    strengths: ["attack", "bolt"],
    powers: [
      { name: "Fireball", desc: "Mọi người, kể cả bạn, đều mất 3 máu." },
      { name: "Vampiric Touch", desc: "Đổi số máu của bạn với một đối thủ." },
      { name: "Charm", desc: "Lấy một lá khiên đang nằm trên bàn của đối thủ về bảo vệ bạn. Nếu chủ cũ bị hạ, bạn giữ đến khi khiên vỡ rồi trả lại." },
    ],
    tips: [
      "Vampiric Touch hiệu quả nhất khi bạn sắp chết và đối thủ đang nhiều máu.",
      "Đừng tung Fireball khi bạn còn 3 máu trở xuống.",
      "Magic Missile vừa gây sát thương vừa cho đánh thêm – rất hay để nối chuỗi.",
    ],
  },
  {
    id: "lia", set: "base", emoji: "✨", color: "#D99A1E",
    name: "Lia", title: "the Radiant", role: "Hiệp sĩ thánh",
    style: "Vừa đánh vừa hồi máu nhiều, trụ rất dai.",
    strengths: ["heart", "attack"],
    powers: [
      { name: "Divine Inspiration", desc: "Chọn một lá bất kỳ trong chồng bài bỏ của bạn đưa lên tay, rồi hồi 2 máu." },
      { name: "Banishing Smite", desc: "Phá hủy toàn bộ khiên đang có trên bàn (cả của bạn), rồi đánh thêm 1 lá." },
    ],
    tips: [
      "Dùng Divine Inspiration để lấy lại Banishing Smite hoặc lá đánh mạnh.",
      "Tung Banishing Smite khi đối thủ có nhiều khiên hơn bạn.",
      "Chiến mã Fluffy là khiên của bạn.",
    ],
  },
  {
    id: "oriax", set: "base", emoji: "🗡️", color: "#6B4FA0",
    name: "Oriax", title: "the Clever", role: "Đạo tặc",
    style: "Nối chuỗi nhiều lá đánh thêm, ăn cắp và né đòn.",
    strengths: ["bolt", "attack"],
    powers: [
      { name: "Pick Pocket", desc: "Lật lá trên cùng bộ bài của một đối thủ và đánh nó như bài của bạn. Xong, lá đó vào chồng bỏ của chủ." },
      { name: "Clever Disguise", desc: "Không ai nhắm vào bạn được cho tới lượt kế tiếp của bạn." },
      { name: "Sneak Attack", desc: "Phá một lá khiên, rồi đánh thêm 1 lá." },
    ],
    tips: [
      "Giữ vài lá đánh thêm để tung một lượt dài liên tục.",
      "Clever Disguise cứu bạn khi máu thấp và bàn đang hỗn loạn.",
    ],
  },

  // ---------- BATTLE FOR BALDUR'S GATE ----------
  {
    id: "minsc", set: "bg", emoji: "🐹", color: "#9A6232",
    name: "Minsc & Boo", title: "", role: "Kiểm lâm và chuột hamster",
    style: "Phòng thủ dày: nhiều khiên, rất ít hồi máu. Thích phá rối bài của người khác.",
    strengths: ["shield", "attack"],
    powers: [
      { name: "Scouting Outing", desc: "Lấy lá trên cùng bộ bài của mỗi đối thủ lên tay bạn. Nếu bạn bị hạ khi còn giữ chúng, các lá đó về chồng bỏ của chủ." },
      { name: "Đổi máu cả bàn", desc: "Bộ bài có lá xáo trộn số máu giữa những người chơi. Đọc kỹ lá để biết đổi theo cách nào." },
      { name: "Kẻ thù ưa thích", desc: "Có lá cho bạn chọn một đối thủ làm mục tiêu ưu tiên. Hiệu ứng in trên lá." },
    ],
    tips: [
      "Hầu như không hồi máu được, nên hãy dựng khiên sớm.",
      "Bài cướp được từ Scouting Outing là bài của bạn để dùng.",
    ],
  },
  {
    id: "jaheira", set: "bg", emoji: "🐺", color: "#3F8F4E",
    name: "Jaheira", title: "", role: "Tu sĩ thiên nhiên biến hình",
    style: "Đổi giữa dạng Sói (tấn công) và dạng Gấu (phòng thủ, hồi máu).",
    strengths: ["attack", "heart"],
    powers: [
      { name: "Shapeshift: Wolf Form", desc: "Vào dạng Sói. Các lá có biểu tượng hình thái được thưởng thêm hiệu ứng thiên về tấn công." },
      { name: "Shapeshift: Bear Form", desc: "Vào dạng Gấu. Các lá có biểu tượng hình thái được thưởng thêm hiệu ứng thiên về phòng thủ và hồi máu." },
    ],
    extra: "Lá hình thái nằm lại trên bàn và không bị đánh như khiên. Mỗi lúc chỉ có một hình thái; vào hình thái mới thì bỏ lá cũ.",
    tips: [
      "Vào dạng trước rồi mới đánh các lá có biểu tượng hình thái để ăn thưởng.",
      "Máu thấp thì chuyển sang Gấu, đối thủ hết khiên thì chuyển sang Sói.",
    ],
  },

  // ---------- MONSTER MADNESS ----------
  {
    id: "cinderpuff", set: "mm", emoji: "🐉", color: "#B8322A",
    name: "Lord Cinderpuff", title: "", role: "Rồng đỏ quý tộc",
    style: "Ông rồng doanh nhân: gây sát thương diện rộng và mặc cả với người chơi khác.",
    strengths: ["attack", "power"],
    powers: [
      { name: "Hơi thở lửa", desc: "Có lá gây sát thương cho tất cả mọi người, rồi dồn thêm sát thương vào vài người." },
      { name: "Mặc cả", desc: "Có lá buộc đối thủ chọn giữa hai cái giá phải trả. Đọc to lá cho cả bàn nghe." },
    ],
    tips: ["Sát thương lan rất mạnh khi bàn đông người."],
  },
  {
    id: "hoots", set: "mm", emoji: "🦉", color: "#A8743A",
    name: "Hoots McGoots", title: "", role: "Gấu cú làm xiếc",
    style: "Lá mạnh, đòn đánh lan ra cả bàn.",
    strengths: ["attack", "shield"],
    powers: [
      { name: "Màn diễn cả rạp", desc: "Có lá khiến mọi lá tấn công bạn đánh trong lượt đó trúng tất cả đối thủ." },
      { name: "To the Face!", desc: "Dùng chính khiên của đối thủ làm vũ khí đánh lại họ." },
    ],
    tips: ["Tung lá đánh lan trước, rồi mới đánh các lá tấn công."],
  },
  {
    id: "tentaculous", set: "mm", emoji: "🐙", color: "#7A4FB5",
    name: "Dr. Tentaculous", title: "", role: "Bác sĩ tâm lý hút não",
    style: "Moi bài từ quá khứ của người khác và can thiệp bài trên tay họ.",
    strengths: ["draw", "power"],
    powers: [
      { name: "Đào bới quá khứ", desc: "Lấy bài từ chồng bỏ của người khác để bạn dùng." },
      { name: "Thao túng tâm trí", desc: "Có lá tác động vào bài trên tay đối thủ." },
    ],
    tips: ["Để ý chồng bỏ của mọi người: lá mạnh nằm đó là lá của bạn."],
  },
  {
    id: "blorp", set: "mm", emoji: "🟩", color: "#4FA87A",
    name: "Blorp", title: "", role: "Khối thạch biết yêu thương",
    style: "Ôm đối thủ xuyên qua khiên, nuốt đồ rồi nhổ vào người khác.",
    strengths: ["attack", "power"],
    powers: [
      { name: "Hugs!", desc: "Đòn ôm gây sát thương xuyên qua khiên." },
      { name: "Nuốt rồi nhổ", desc: "Nuốt bài của một đối thủ, rồi dùng nó tấn công người khác." },
    ],
    tips: ["Nhắm Hugs! vào người đang núp sau nhiều khiên."],
  },
  {
    id: "delilah", set: "mm", emoji: "👁️", color: "#D0487E",
    name: "Delilah Deathray", title: "", role: "Quái mắt hoa hậu",
    style: "Đòi được khen. Ai không khen thì ăn tia mắt.",
    strengths: ["draw", "attack"],
    powers: [
      { name: "Praise Me", desc: "Bạn rút 3 lá. Mỗi đối thủ chọn: khen bạn thật lòng, hoặc mất 2 máu." },
      { name: "Tia mê hoặc", desc: "Trong lượt kế tiếp, bạn quyết định mục tiêu cho các lá tấn công. Phạm vi in trên lá." },
    ],
    tips: ["Lá tương tác cả bàn: đọc to và diễn cho vui."],
  },
  {
    id: "mimi", set: "mm", emoji: "🧰", color: "#C07A2C",
    name: "Mimi LeChaise", title: "", role: "Quái giả dạng",
    style: "Giả làm đồ vật, bắt chước bài của người khác.",
    strengths: ["shield", "power"],
    powers: [
      { name: "Definitely Just a Mirror", desc: "Sao chép một lá khiên của đối thủ để tự bảo vệ." },
      { name: "Bắt chước", desc: "Có lá cho phép mượn hiệu ứng từ bài của người khác." },
    ],
    tips: ["Chờ đối thủ đặt khiên to rồi hẵng sao chép."],
  },
];

window.RULES = {
  setup: [
    "Mỗi người chọn một nhân vật, lấy bộ 28 lá, thẻ máu và thẻ tham khảo cùng màu.",
    "Đặt dấu máu ở số 10.",
    "Xáo bộ bài, úp trước mặt. Mỗi người rút 3 lá.",
    "Người nhỏ tuổi nhất đi trước, sau đó chuyển sang bên trái.",
  ],
  turn: [
    "Rút 1 lá từ bộ bài của bạn.",
    "Đánh ít nhất 1 lá. Làm theo mọi biểu tượng trên lá đó.",
    "Mỗi biểu tượng đánh thêm ⇒ bắt buộc đánh thêm 1 lá.",
    "Bỏ các lá vừa đánh vào chồng bỏ, trừ lá khiên (nằm lại trên bàn).",
    "Chuyển lượt sang người bên trái.",
  ],
  shields: [
    "Lá khiên nằm trước mặt bạn cho tới khi bị phá.",
    "Đặt dấu sát thương lên từng biểu tượng khiên khi trúng đòn. Hết biểu tượng thì bỏ lá.",
    "Còn khiên thì đòn tấn công không chạm được tới máu của bạn.",
    "Sát thương thừa đi tiếp sang khiên khác, hết khiên thì vào máu.",
  ],
  faq: [
    { q: "Hồi máu quá 10 được không?", a: "Không. Tối đa là 10." },
    { q: "Hết bài trên tay?", a: "Rút ngay 2 lá. Nếu đang dở chuỗi đánh thêm thì đánh tiếp." },
    { q: "Hết bài trong bộ?", a: "Xáo chồng bỏ thành bộ mới." },
    { q: "Có được bỏ qua lá đánh thêm không?", a: "Không. Mỗi biểu tượng đánh thêm là một lá bắt buộc." },
    { q: "Mọi người cùng bị hạ một lúc?", a: "Hòa. Chơi ván mới!" },
    { q: "Lá chữ và biểu tượng khác nhau?", a: "Làm hết: dùng mọi biểu tượng, rồi làm theo chữ của lá Mighty Power." },
  ],
  bigTable: [
    "Chỉ được tấn công người ngồi ngay bên trái hoặc bên phải bạn.",
    "Lá đánh \"tất cả mọi người\" vẫn trúng cả bàn.",
    "Luật tùy chọn: người bị hạ thành hồn ma báo thù, mỗi vòng gây 1 sát thương cho ai đó nhưng không được ra đòn kết liễu.",
  ],
  win: "Người cuối cùng còn máu là người thắng.",
};
