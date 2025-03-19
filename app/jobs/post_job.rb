# frozen_string_literal: true

class PostJob
  include Sidekiq::Job

  def perform(post_slug, user_id)
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })
    post = Post.find_by(slug: post_slug)
    puts post.title
    html_content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "api/v1/posts/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string html_content
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })

    if post.report.attached?
      post.report.purge_later
    end
    post.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf"
    )
    post.save
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
  end
end
