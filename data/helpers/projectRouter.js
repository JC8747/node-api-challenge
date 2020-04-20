const express = require("express");
const router = express.Router();
const projects = require("./projectModel");
const actions = require("./actionModel");

router.get("/", (req, res, next) => {
  console.log("req.query", req.query);
  projects
    .get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(error => {
      next(error);
    });
});

router.post("/", validateProject(), (req, res, next) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.post(
  "/:id/actions",
  validateProjectId(),
  validateAction(),
  (req, res, next) => {
    const { description, notes } = req.body;
    const { id: project_id } = req.params;
    actions
      .insert({ description, notes, project_id })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        next(error);
      });
  }
);

router.get("/:id", validateProjectId(), (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId(), (req, res, next) => {
  projects
    .getProjectActions(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/:id", validateProjectId(), (req, res, next) => {
  projects
    .remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "The project has been deleted" });
    })
    .catch(error => {
      next(error);
    });
});

router.put("/:id", validateProject(), validateProjectId(), (req, res, next) => {
  projects
    .update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      next(error);
    });
});

function validateProject(req, res, next) {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "Missing Project Name" });
    } else if (!req.body.description) {
      return res.status(400).json({ message: "missing project description" });
    }
    next();
  };
}

function validateAction(req, res, next) {
  return (req, res, next) => {
    if (!req.body.description) {
      return res
        .status(400)
        .json({ message: "Missing Action Description" });
    } else if (!req.body.notes) {
      return res
        .status(400)
        .json({ message: "Missing Required Actions Notes" });
    }
    next();
  };
}

function validateProjectId(req, res, next) {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: "Invalid Project ID" });
        }
      })
      .catch(error => {
        next(error);
      });
  };
}

module.exports = router;