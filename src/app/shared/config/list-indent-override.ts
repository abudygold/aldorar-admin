import { ModelDocumentSelection, Editor, ModelElement, List, ListIndentCommand, Plugin, ModelWriter, _expandListBlocksToCompleteList, _isListItemBlock, _ListElement } from "ckeditor5";
// import { expandListBlocksToCompleteList, isListItemBlock, ListElement } from "./model";

type IndentDirection = "backward" | "forward";

export class CustomListIndent extends Plugin {
  static get requires() {
    return [
      List,
    ];
  }

  init() {
    this.editor.commands.add("outdentList", new CustomListIndentCommand(this.editor, "backward"));
    this.editor.commands.add("indentList", new CustomListIndentCommand(this.editor, "forward"));
  }
}

export class CustomListIndentCommand extends ListIndentCommand {
  private readonly _indentDirection;

  constructor(editor: Editor, indentDirection: IndentDirection) {
    super(editor, indentDirection);
    this._indentDirection = indentDirection;
  }

  public override execute(): void {
    const model = this.editor.model;
    const blocks = this.getSelectedListBlocks(model.document.selection);

    // If no list is selected, revert to native handling and exit
    if (blocks.length === 0) {
      return;
    }

    // If the entire list is not selected, revert to the native handling and exit
    const fullList = _expandListBlocksToCompleteList(blocks);
    const isFullListSelected = blocks.length === fullList.length;
    if (!isFullListSelected) {
      super.execute();
      return;
    }

    // If this is an outdent and there's no existing full-list indent, revert to the native handling and exit
    if (this._indentDirection === "backward" && fullList[0].parent?.name !== "htmlDiv") {
      super.execute();
      return;
    }

    model.change(ModelWriter => {
      if (this._indentDirection === "backward") {
        this.outdentFullList(ModelWriter, fullList);
      } else {
        this.indentFullList(ModelWriter, fullList);
      }
    });
  }

  public override refresh(): void {
    super.refresh();

    if (this._indentDirection === "forward") {
      const selectedBlocks = this.getSelectedListBlocks(this.editor.model.document.selection);
      const fullList = _expandListBlocksToCompleteList(selectedBlocks);
      if (fullList.length === 0) {
        return;
      }

      const isFullListSelected = selectedBlocks.length === fullList.length;
      if (isFullListSelected) {
        this.isEnabled = true;
      }
    }
  }

  private getPaddingLeftStyle(htmlDivElement: ModelElement) {
    const divAttributes = htmlDivElement.getAttribute("htmlDivAttributes") as any;
    return divAttributes?.styles["padding-left"];
  }

  private getSelectedListBlocks(selection: ModelDocumentSelection) {
    const blocks = Array.from(selection.getSelectedBlocks());
    const firstNonListBlockIndex = blocks.findIndex(block => !_isListItemBlock(block));

    if (firstNonListBlockIndex != -1) {
      blocks.length = firstNonListBlockIndex;
    }

    return blocks as Array<_ListElement>;
  }

  private indentFullList(ModelWriter: ModelWriter, list: Array<_ListElement>) {
    const firstListItem = list[0];
    const hasParentHtmlDiv = firstListItem.parent?.name === "htmlDiv";

    const htmlDivElement = hasParentHtmlDiv
      ? firstListItem.parent
      : ModelWriter.createElement("htmlDiv");

    this.setHtmlDivPadding(htmlDivElement, ModelWriter, "forward");

    if (!hasParentHtmlDiv) {
      const position = ModelWriter.createPositionBefore(firstListItem);
      ModelWriter.insert(htmlDivElement, position, "end");
      for (const listItem of list) {
        ModelWriter.append(listItem, htmlDivElement);
      }

      ModelWriter.setSelection(ModelWriter.createRangeOn(htmlDivElement));
    }
  }

  private outdentFullList(ModelWriter: ModelWriter, list: Array<_ListElement>) {
    const firstListItem = list[0];
    const hasParentHtmlDiv = firstListItem.parent?.name === "htmlDiv";

    if (hasParentHtmlDiv) {
      const parentHtmlDiv = firstListItem.parent;
      this.setHtmlDivPadding(parentHtmlDiv, ModelWriter, "backward");
    }

    // If the html div has no padding, that means there's no more need to keep the div handling indentation;
    // remove it entirely to revert back to native list handling
    if (this.shouldRemoveListIndent(list)) {
      this.removeListIndent(ModelWriter, list);
    }
  }

  private removeListIndent(ModelWriter: ModelWriter, list: Array<_ListElement>) {
    const firstListItem = list[0];
    const hasParentHtmlDiv = firstListItem.parent?.name === "htmlDiv";
    if (hasParentHtmlDiv) {
      const parentHtmlDiv = firstListItem.parent;
      const position = ModelWriter.createPositionAfter(parentHtmlDiv);

      for (let index = list.length - 1; index >= 0; index--) {
        const currentListItem = list[index];
        ModelWriter.insert(currentListItem, position);
      }

      ModelWriter.remove(parentHtmlDiv);

      if (list.length === 1) {
        const range = ModelWriter.createRangeOn(firstListItem);
        ModelWriter.setSelection(range);
      } else {
        const lastListItem = list[list.length - 1];
        const range = ModelWriter.createRange(
          ModelWriter.createPositionAt(firstListItem, "before"),
          ModelWriter.createPositionAt(lastListItem, "end")
        );
        ModelWriter.setSelection(range);
      }
    }
  }

  private resolvePaddingValue(htmlDivElement: ModelElement, indentDirection: IndentDirection) {
    const paddingLeft = this.getPaddingLeftStyle(htmlDivElement);
    if (paddingLeft) {
      const paddingValueWithoutRem = paddingLeft.replace(/[^0-9]/g, '');
      const paddingValue = parseInt(paddingValueWithoutRem);

      const newPaddingValue = indentDirection === "backward"
        ? Math.max(0, paddingValue - 20)
        : paddingValue + 20;

      return `${newPaddingValue}px`;
    } else {
      return indentDirection === "backward"
        ? "0px"
        : "20px";
    }
  }

  private setHtmlDivPadding(htmlDiv: ModelElement, ModelWriter: ModelWriter, indentDirection: IndentDirection) {
    const paddingValue = this.resolvePaddingValue(htmlDiv, indentDirection);
    ModelWriter.setAttributes({
      htmlDivAttributes: {
        styles: {
          "padding-left": paddingValue,
        },
      }
    }, htmlDiv);
  }

  private shouldRemoveListIndent(list: Array<_ListElement>) {
    if (this._indentDirection === "forward") {
      return false;
    }

    const firstListItem = list[0];
    const hasParentHtmlDiv = firstListItem.parent?.name === "htmlDiv";
    if (!hasParentHtmlDiv) {
      return false;
    }

    const paddingLeft = this.getPaddingLeftStyle(firstListItem.parent);
    return paddingLeft === "0px";
  }
}