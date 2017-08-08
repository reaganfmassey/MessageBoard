﻿using MessageBoard.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace MessageBoard.Controllers
{
    public class TopicsController : ApiController
    {
        private IMessageBoardRepository _repo;
        public TopicsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }
        public IEnumerable<Topic> Get(bool includeReplies=false)
        {
            IQueryable<Topic> results;

            if (includeReplies==true)
            {
                results = _repo.GetTopicsIncludingReplies();
            }
            else
            {
                results = _repo.GetTopics();
            }
            var topics = results.OrderByDescending(t => t.Created)
                .Take(25)
                .ToList();
                
            return topics;
        }

        // POST: api/Topics
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Topic newTopic)
        {
            if (newTopic.Created == default(DateTime))
            {
                newTopic.Created = DateTime.UtcNow;
            }
            if (_repo.AddTopic(newTopic) && _repo.Save())
            {
                return Request.CreateResponse(System.Net.HttpStatusCode.Created, newTopic);
            }
            return Request.CreateResponse(System.Net.HttpStatusCode.BadRequest);
        }

    }
}
