const voteService = require("../services/voteService");

async function vote(req, res) {
  try {
    await voteService.vote({
      ideaId: req.body.ideaId,
      userId: req.session.user.id,
      isAgreement: req.body.voteType === "agree",
    });
    req.flash("success_msg", "Voto adicionado com sucesso!");
    return res.redirect(req.get("referer") || "/ideas");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/ideas");
  }
}

async function clearVote(req, res) {
  try {
    await voteService.clearVote({
      ideaId: req.body.ideaId,
      userId: req.session.user.id,
    });
    req.flash("success_msg", "Voto cancelado com sucesso!");
    res.redirect("/ideas");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/ideas");
  }
}

module.exports = {
  vote,
  clearVote,
};
